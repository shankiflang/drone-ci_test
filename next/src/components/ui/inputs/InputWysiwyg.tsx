import React from 'react'
import dynamic from 'next/dynamic'
import { ErrorMessage } from 'formik'
import { AiOutlineWarning } from 'react-icons/ai/index'


const CustomEditor = dynamic(() => import('components/ui/global/CustomEditor'), { ssr: false })



interface Props {
	setFieldValue: any
	label: string
	field: string
	value: any
	required?: boolean
	className?: string
}


const InputWysiwyg = ({ setFieldValue, label, field, required, value, className }: Props) => {
	return (
		<>
			<div className="relative">
				<p className="absolute text-l-300 dark:text-d-300 transition-all -top-2.5 left-3.5 bg-l-default dark:bg-d-default px-1 z-10">
					{label}
					<span className="text-primary-main ml-1">{required ? '*' : ''}</span>
				</p>
				<div className={className + ' input-code-container'}>
					<CustomEditor setFieldValue={setFieldValue} field={field} value={value} />
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

export default InputWysiwyg