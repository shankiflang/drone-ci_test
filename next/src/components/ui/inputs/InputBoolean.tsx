import React from 'react'
import { FaCheck } from 'react-icons/fa/index'
import Input from './Input'



interface Props {
    setFieldValue: any
    value: any
    name: string
    field?: string
    required?: boolean
    maxLength?: number
    label?: string
    className?: string,
    disabled?: boolean
    customEnableAction?: any
    customDisableAction?: any
}


const InputBoolean = ({ setFieldValue, value, name, field, required, maxLength, label, className, disabled, customDisableAction, customEnableAction }: Props) => {
    
    const handleChange = () => {
		if (!disabled && customEnableAction && !value) {
			return customEnableAction()
		}

		if (!disabled && customDisableAction && value) {
			return customDisableAction()
		}

		if (!disabled) {
			return setFieldValue(field, !value)
		}
	}
    
    return (
        <Input
            setFieldValue={setFieldValue}
            value={value}
            name={name}
            type={'checkbox'}
            field={field}
            required={required}
            maxLength={maxLength}
            label={label}
            className={className}
            disabledModify={disabled}
        >

                <div
                    className={`my-2 flex flex-row justify-start items-center group cursor-pointer w-full h-10 pl-4 ${disabled ? 'opacity-50 cursor-default' : ''}`}
                    onClick={handleChange}
                >
                    <button
                        type="button"
                        role="checkbox"
                        aria-label="checkbox"
                        data-checked={value}
                        aria-checked={value}
                        data-indeterminate={value}
                        className={
                            `relative transition-all w-5 h-5 cursor-pointer border-2 border-l-border-dark dark:border-d-border-light rounded-sm
                            ${(value) ? ' border-l-secondary-main dark:border-d-primary-main' : ''}
                            ${(!disabled) ? ' hover:border-l-secondary-main dark:hover:border-d-primary-main' : ' cursor-default'}
                            `
                        }
                    >
                        {
                            (value) && (
                                <FaCheck className="absolute top-[1px] left-[1px] text-l-secondary-main dark:text-d-primary-main font-bold w-3.5 h-3.5" />
                            )
                        }
                    </button>
                    {
                        value ? (
                            <p className="ml-2.5 text-base text-300 flex-grow select-none">Activé</p>
                        ) : (
                            <p className="ml-2.5 text-base text-300 flex-grow select-none">Désactivé</p>
                        )
                    }
                </div>
        </Input>
    )
}


export default InputBoolean