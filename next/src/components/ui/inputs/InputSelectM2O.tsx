import { useModal } from 'components/providers/ModalProvider'
import { ErrorMessage } from 'formik'
import omitDeep from 'omit-deep-lodash'
import React from 'react'
import { AiOutlineWarning } from 'react-icons/ai/index'
import { IoIosArrowDown } from 'react-icons/io/index'
import Input from './Input'
import InputSelectM2OModal from 'components/modals/InputSelectM2OModal'



interface Props {
    setFieldValue: any
    value: any
    name: string
    foreign_key_table: string
    field?: string
    required?: boolean
    label?: string
    className?: string,
    fileLimit?: number,
    selectColumn?: string,
    system?: boolean,
    forceFields?: string
}




const InputSelectM2O = ({ setFieldValue, name, field, required, label, className, value, selectColumn, foreign_key_table, system, forceFields }: Props) => {
    const { handleModal } = useModal()

    const handleUpdateParent = (record: any) => {
        setFieldValue(field, { ...omitDeep({ ...record }, ['__typename']) })
    }

    return (
        <>
            <Input
                onClick={
                    () => handleModal(
                        <InputSelectM2OModal
                            handleUpdateParent={handleUpdateParent}
                            currentSelectedIds={value?.id ? [value.id] : []}
                            collection={foreign_key_table}
                            system={system ?? false}
                            forceFields={forceFields ?? null}
                        />,
                        "bg-default top-0 right-0 absolute md:w-[80%]"
                    )
                }
                setFieldValue={setFieldValue}
                value={selectColumn ? (value && value[selectColumn] ? value[selectColumn] : '') : value?.id ?? ''}
                name={name}
                type={'text'}
                disabled={true}
                field={field}
                required={required}
                label={label}
                className={className + ' input-file'}
                Icon={IoIosArrowDown}
                IconAction={() => { }}
            />
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


export default InputSelectM2O