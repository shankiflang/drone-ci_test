import React from 'react'
import { MdDeleteOutline } from 'react-icons/md/index'
import { ErrorMessage } from 'formik'
import { AiOutlineWarning } from 'react-icons/ai/index'
import { useGetAllRelationsQuery } from 'graphql/generated/hooks'
import { useModal } from 'components/providers/ModalProvider'
import omitDeep from 'omit-deep-lodash'
import Button from '../buttons/Button'
import InputO2MModal from 'components/modals/InputO2MModal'


interface Props {
    setFieldValue: any
    value: any
    field?: string
    required?: boolean
    label?: string
    className?: string,
    collection?: string
}


const InputO2M = ({ collection, setFieldValue, value, field, required, label, className }: Props) => {
    const [manyCollection, setManyCollection] = React.useState<string | undefined>(undefined)

    const { data } = useGetAllRelationsQuery()

    // Find linked collection
    React.useEffect(() => {
        if (data && data.relations && data.relations.length > 0) {
            data.relations.find((relation) => {
                if (relation?.meta?.one_field === field && relation?.related_collection === collection && relation?.meta?.many_collection) {
                    setManyCollection(relation?.meta?.many_collection)
                    return true
                }
                return false
            })
        }
    }, [data]) // eslint-disable-line

    const { handleModal } = useModal()

    // Update parent with selected records
    const handleUpdateParent = (records: any) => {
        setFieldValue(
            field,
            records.map((record: any) => omitDeep({ ...record }, ['__typename']))
        )
    }


    return (
        <>
            <div className={className}>
                <p className="text-300">
                    {label}
                    <span className="text-primary-main ml-1">{required ? '*' : ''}</span>
                </p>
                {value?.length > 0 && (
                    <div>
                        {
                            value && value.map((item: any, index: number) => (
                                <div key={index} className="h-14 px-4 mb-2 transition-all flex justify-between items-center cursor-pointer border-2 border-l-border dark:border-d-border rounded-md hover:bg-main hover:border-l-dark hover:dark:border-d-border-light">
                                    <p>
                                        {item.id}
                                    </p>
                                    <MdDeleteOutline
                                        className="transition-all text-600 cursor-pointer hover:text-error-main w-6 h-6"
                                        onClick={() =>
                                            setFieldValue(
                                                field,
                                                value.filter((v: string) => v !== item)
                                            )
                                        }
                                    />
                                </div>
                            ))
                        }
                    </div>
                )}
                <div>
                    <Button
                        className="max-w-xs mt-1"
                        variant="secondary"
                        name="Choisir"
                        onClick={() => {
                            handleModal(
                                <InputO2MModal
                                    handleUpdateParent={handleUpdateParent}
                                    currentSelectedIds={value ? value.map((item: any) => item.id) : []}
                                    collection={manyCollection}
                                />,
                                "bg-default top-0 right-0 absolute md:w-[80%]"
                            )
                        }}
                    >
                        <p>
                            { value && value.length > 0 ? 'Modifier les élements' : 'Ajouter des éléments' }
                        </p>
                    </Button>
                </div>
            </div>
            {
                field && (
                    <ErrorMessage name={field}>
                        {
                            (msg) => (
                                <div className="flex flex-row justify-start items-start text-error-main mb-2">
                                    <AiOutlineWarning className="w-5 h-5" />
                                    <p className="mt-0 ml-2 font-light">
                                        {msg}
                                    </p>
                                </div>
                            )
                        }
                    </ErrorMessage>
                )
            }
        </>
    )
}


export default InputO2M