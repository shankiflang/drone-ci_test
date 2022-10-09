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
import { useCreateRecordMutation } from 'graphql/generated/client/useCreateRecordMutation'
import schemas from 'graphql/schemas'
import humanize from 'lib/utils/humanize'
import inputs from 'components/ui/inputs'
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


const CreateRecordForm = ({ collection }: Props) => {
    const router = useRouter()
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
    const [createRecordSchema, setCreateRecordSchema] = React.useState<any>(null)


    /*
     *
     *   Data hooks
     *
     *   useGetAllFieldsInCollectionQuery => Get all fields in current collection
     *
     */
    const { data: { fields_in_collection: collectionFields = {} } = {} } = useGetAllFieldsInCollectionQuery({ variables: { collection } })
    const [createRecord] = useCreateRecordMutation(collection, schemas.find((schema: any) => schema.name === collection)?.schema ?? 'id')


    /*
    *
    *   Functions
    *
    *   buildCollectionFields => build array of fields from collectionFields
    *
    */
    const getFieldValue = (field: any) => {
        switch (field.type) {
            case 'integer':
            case 'float':
            case 'decimal':
                return field?.schema?.default_value ? parseInt(field?.schema?.default_value) : field.meta.required ? null : null
            case 'uuid':
                return field?.schema?.default_value ? field?.schema?.default_value : null
            case 'boolean':
                return field?.schema?.default_value ? field?.schema?.default_value === 'true' : false
            case 'json':
                return field?.schema?.default_value ? field?.schema?.default_value : null
            default:
                return field?.schema?.default_value ? field?.schema?.default_value : field.meta.required ? '' : null
        }
    }

    const buildCollectionFields = ({ collectionFields }: { collectionFields: any }) => {
        if (Array.isArray(collectionFields)) {
            let newFields: FieldObject[] = []
            let newInitialValues: any = {}

            collectionFields.forEach((field) => {
                if (['id', 'sort', 'date_created', 'user_created', 'date_updated', 'user_updated'].includes(field.field)) return

                // if field is readonly, don't add it to the form
                if (field?.meta?.readonly) return

                let fieldValue = getFieldValue(field)

                newFields.push({
                    collection,
                    label: humanize(field.field),
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


    /*
    *
    *   Effects
    *
    *   Build fields from buildCollectionFields() when collectionFields changes
    *
    */
    useMemo(() => buildCollectionFields({ collectionFields }), [collectionFields]) // eslint-disable-line

    useEffect(() => {
        if (collection) {
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

            let newCreateRecordSchema: any = object({
                ...rawSchema,
            })

            setCreateRecordSchema(newCreateRecordSchema)
        }
    }, [fields]) // eslint-disable-line


    return (
        <div className="w-full flex flex-col items-start justify-start text-100 p-8 mb-16">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    ...initialValues,
                }}
                validationSchema={createRecordSchema}
                onSubmit={async (values) => {
                    createRecord({
                        variables: {
                            item: {
                                ...values,
                            },
                        },
                        onCompleted: () => {
                            toast.success("L'élément a bien été créé.")
                            return router.push(redirectUrl)
                        },
                        onError: () => {
                            toast.error("Une erreur est survenue lors de la création de l'élément")
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
                            <div className="flex flex-row justify-start items-center h-14 max-w-[calc(100vw-108px)] md:max-w-none">
                                {
                                    (screen === 'sm' || screen === 'md') ?
                                        (
                                            <MdMenu
                                                className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200 hover:bg-light transition-all cursor-pointer"
                                                onClick={() => setSidebarOpen(true)}
                                            />
                                        ) : (
                                            <Link href={redirectUrl}>
                                                <a>
                                                    <Button variant="secondary" className="w-11 h-11 rounded-full flex justify-center items-center" name="Retour en arrière" tooltip={true}>
                                                        <BiChevronLeft className="w-full h-full" />
                                                    </Button>
                                                </a>
                                            </Link>
                                        )
                                }
                                <h1 className="capitalize ml-4 text-2xl text-100 truncate w-[calc(100vw-108px-44px)] sm:w-fit">
                                    {collection}
                                </h1>
                            </div>
                            <div className="flex flex-row justify-start items-center h-14">
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
        </div>
    )
}


export default CreateRecordForm