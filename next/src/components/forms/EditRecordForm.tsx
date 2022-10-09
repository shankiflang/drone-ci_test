import React, { useEffect, useMemo } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from 'components/ui/buttons/Button'
import { BiChevronLeft } from 'react-icons/bi/index'
import { MdCheck, MdMenu } from 'react-icons/md/index'
import { boolean, date, number, string, mixed, object } from 'yup'
import { useGetAllFieldsInCollectionQuery } from 'graphql/generated/hooks'
import { useDeleteRecordMutation } from 'graphql/generated/client/useDeleteRecordMutation'
import schemas from 'graphql/schemas'
import humanize from 'lib/utils/humanize'
import inputs from 'components/ui/inputs'
import { useUpdateRecordMutation } from 'graphql/generated/client/useUpdateRecordMutation'
import { useLazyGetRecordQuery } from 'graphql/generated/client/useGetRecordQuery'
import refactorEditorjsJson from 'lib/utils/refactorEditorjsJson'
import { MdDeleteOutline } from 'react-icons/md/index'
import { useCurrentUser } from 'components/providers/UserProvider'
import { useResponsive } from 'components/hooks/useResponsive'



export const types = {
    text: string(),
    hash: string(),
    string: string(),
    integer: number(),
    float: number(),
    decimal: number(),
    bigInteger: number(),
    boolean: boolean(),
    dateTime: date(),
}


export interface FieldObject {
    collection: string
    label: string
    rawField: any
    field: string
    type: string
    value: any
    interface: string
    required: boolean
    maxLength?: number
    options?: any
    foreign_key_table?: string
}



interface Props {
    collection: string,
}



const EditRecordForm = ({ collection }: Props) => {
    const router = useRouter()
    const { id } = router.query
    const { setSidebarOpen } = useCurrentUser();
    const screen = useResponsive();

    let redirectUrl = router.asPath.slice(0, router.asPath.lastIndexOf('/'))

    /*
     *
     *   State managers
     *
     *   fields : fields formatted correctly
     *   initialValues : initial values for the form
     *
     */
    const [fields, setFields] = React.useState<FieldObject[]>([])
    const [initialValues, setInitialValues] = React.useState<any>({})
    const [editRecordSchema, setEditRecordSchema] = React.useState<any>(null)


    /*
     *
     *   Data hooks
     *
     *   useGetAllFieldsInCollectionQuery => Get all fields in current collection
     *
     */
    const [getRecord, { data }] = useLazyGetRecordQuery(
        collection,
        schemas.find((schema: any) => schema.name === collection)?.schema ?? 'id',
        {
            fetchPolicy: 'network-only',
            variables: {
                id: id,
            },
        }
    )
    const { data: { fields_in_collection: collectionFields = {} } = {} } = useGetAllFieldsInCollectionQuery({ variables: { collection } })
    const [editRecord] = useUpdateRecordMutation(collection, schemas.find((schema: any) => schema.name === collection)?.schema ?? 'id')
    // delete record
    const [deleteRecord] = useDeleteRecordMutation(collection)

    /*
    *
    *   Functions
    *
    *   buildCollectionFields => build array of fields from collectionFields
    *
    */
    const getFieldValue = (field: any, recordField: any) => {
        switch (field.type) {
            case 'integer':
            case 'float':
            case 'decimal':
                return recordField
                    ? recordField
                    : field?.schema?.default_value
                        ? parseInt(field?.schema?.default_value)
                        : field.meta.required
                            ? 0
                            : null
            case 'uuid':
                return recordField ? recordField : field?.schema?.default_value ? field?.schema?.default_value : null
            case 'boolean':
                return recordField ? recordField : field?.schema?.default_value ? field?.schema?.default_value === 'true' : false
            case 'json':
                return recordField ? recordField : field?.schema?.default_value ? field?.schema?.default_value : null
            default:
                return recordField
                    ? recordField
                    : field?.schema?.default_value
                        ? field?.schema?.default_value
                        : field.meta.required
                            ? ''
                            : null
        }
    }

    const buildCollectionFields = ({ collectionFields }: { collectionFields: any }) => {
        if (Array.isArray(collectionFields) && data && data[`${collection}_by_id`]) {
            let record = data[`${collection}_by_id`]
            let newFields: FieldObject[] = []
            let newInitialValues: any = {}

            collectionFields.forEach((field: any) => {
                if (['id', 'sort', 'date_created', 'user_created', 'date_updated', 'user_updated'].includes(field.field)) return

                // if field is readonly, don't add it to the form
                if (field?.meta?.readonly) return

                let recordField = record[field.field]

                if (recordField) {
                    if (Array.isArray(record[field.field])) {
                        let newRecordField: any[] = []
                        recordField.forEach((item: any) => {
                            var subItem = Object.assign({}, { ...item })
                            delete subItem.__typename
                            newRecordField.push(subItem)
                        })
                        recordField = newRecordField
                    } else if (recordField.__typename) {
                        let newRecordField = Object.assign({}, { ...recordField })
                        delete newRecordField.__typename
                        recordField = newRecordField
                    }
                }

                let fieldValue = getFieldValue(field, recordField)

                newFields.push({
                    collection,
                    label: humanize(field.field),
                    rawField: record[field.field] ?? {},
                    field: field.field,
                    type: field.type,
                    value: fieldValue,
                    interface: field.meta.interface,
                    required: field.meta.required,
                    maxLength: field?.schema?.max_length ?? null,
                    options: field?.meta?.options ?? null,
                    foreign_key_table: field?.schema?.foreign_key_table ?? null,
                })

                newInitialValues[field.field] = fieldValue
            })

            setInitialValues(newInitialValues)
            setFields(newFields)
        }
    }

    // handle delete
    const handleDelete = async () => {
        if (id) {
            await deleteRecord({
                variables: {
                    ids: [id as string],
                },
                onCompleted: () => {
                    toast.success("L'élément a été supprimé avec succès.")
                    return router.push(redirectUrl)
                },
                onError: () => {
                    return toast.error("Une erreur est survenue lors de la suppression de l'élément.")
                },
            })
        }
    }


    /*
    *
    *   Effects
    *
    *   Build fields from buildCollectionFields() when collectionFields changes
    *
    */
    useMemo(() => buildCollectionFields({ collectionFields }), [collectionFields, data]) // eslint-disable-line
    useEffect(() => {
        if (collection) {
            getRecord()
        }
    }, []) // eslint-disable-line
    useEffect(() => {
        let rawSchema = {}

        fields.forEach((field) => {
            if (types[field.type as keyof typeof types] && field.interface.includes('input')) {
                if (field.required) {
                    ; (rawSchema as any)[field.field] = types[field.type as keyof typeof types].required(
                        `Le champ "${field.label}" est obligatoire.`
                    )
                }
            } else if (field.required) {
                ; (rawSchema as any)[field.field] = mixed().required(`Le champ "${field.label}" est obligatoire.`)
            } else {
                ; (rawSchema as any)[field.field] = mixed().nullable()
            }
        })

        let newEditRecordSchema: any = object({
            ...rawSchema,
        })

        setEditRecordSchema(newEditRecordSchema)
    }, [fields])

    return (
        <div className="w-full flex flex-col items-start justify-start text-100 p-8 mb-16">
            {
                Object.keys(initialValues)?.length > 0 && fields && data && (
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            ...initialValues,
                        }}
                        validationSchema={editRecordSchema}
                        onSubmit={async (values) => {
                            let newValues = { ...values }

                            for (const [key, value] of Object.entries(newValues)) {
                                if ((value as any)?.blocks && (value as any)?.time && (value as any)?.version) {
                                    newValues[key] = refactorEditorjsJson(value, false)
                                }
                            }

                            editRecord({
                                variables: {
                                    ids: [id as string],
                                    item: {
                                        ...newValues,
                                    },
                                },
                                onCompleted: () => {
                                    toast.success("L'élément a bien été édité")
                                    return router.push(redirectUrl)
                                },
                                onError: () => {
                                    toast.error("Une erreur est survenue lors de l'édition de l'élément.")
                                    return
                                },
                            })
                        }}
                    >
                        {(formikProps) => (
                            <form
                                className="flex flex-col justify-start items-start w-full"
                                onSubmit={formikProps.handleSubmit}
                            >
                                <div className="flex flex-row justify-between items-start mb-4 h-14 w-full">
                                    <div className="flex flex-row justify-start items-center h-14 max-w-[calc(100vw-176px)] md:max-w-none">
                                        {
                                            (screen === 'sm' || screen === 'md') ?
                                                (
                                                    <MdMenu
                                                        className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200 hover:bg-light transition-all cursor-pointer"
                                                        onClick={() => setSidebarOpen(true)}
                                                    />
                                                ) : (
                                                    <Button variant="secondary" className="w-11 h-11 rounded-full flex justify-center items-center" onClick={() => router.push(redirectUrl)} name="Retour en arrière" tooltip={true}>
                                                        <BiChevronLeft className="w-full h-full" />
                                                    </Button>
                                                )
                                        }
                                        <h1 className="capitalize ml-4 text-2xl text-100 truncate w-[calc(100vw-176px-44px)] sm:w-fit">
                                            {collection}
                                        </h1>
                                    </div>
                                    <div className="flex flex-row justify-start items-center h-14">
                                        <Button variant="secondary" className="w-11 h-11 mr-2 rounded-full group transition-all" onClick={handleDelete} name="Supprimer" tooltip={true}>
                                            <MdDeleteOutline className="w-full h-full text-400 group-hover:text-300 transition-all" />
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="w-11 h-11 rounded-full"
                                            submit={true}
                                            name="Sauvegarder"
                                            tooltip={true}
                                        >
                                            <MdCheck className="w-full h-full" />
                                        </Button>
                                    </div>
                                </div>

                                {fields.map((field, index) => {
                                    let FieldComponent = inputs[field.interface as keyof typeof inputs] as any

                                    if (FieldComponent) {
                                        return (
                                            <div className="w-full lg:min-w-[650px] lg:w-[50%]" key={index}>
                                                <FieldComponent
                                                    className="my-6"
                                                    {...field}
                                                    setFieldValue={formikProps.setFieldValue}
                                                    value={formikProps.values[field.field]}
                                                />
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })}
                                <Button
                                    variant="primary"
                                    className="w-full lg:min-w-[650px] lg:w-[50%] h-11 rounded-md mt-6 mb-16"
                                    submit={true}
                                    name="Sauvegarder"
                                >
                                    Sauvegarder
                                </Button>
                            </form>
                        )}
                    </Formik>
                )
            }
        </div>
    )
}


export default EditRecordForm