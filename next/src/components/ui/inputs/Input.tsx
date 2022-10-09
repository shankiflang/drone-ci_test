import React from 'react'
import clsx from 'clsx'
import { ErrorMessage } from 'formik'
import { AiOutlineWarning } from 'react-icons/ai/index'


interface Props {
    setFieldValue: any
    value: any
    name: string
    type: string
    field?: string
    required?: boolean
    maxLength?: number
    Icon?: any
    IconAction?: any | Boolean,
    SecondIcon?: any,
    SecondIconAction?: any | Boolean,
    label?: string
    className?: string,
    children?: React.ReactNode,
    style?: any,
    mixed?: boolean,
    rows?: number,
    cols?: number,
    disabled?: boolean,
    disabledModify?: boolean,
    onClick?: any,
    unstyled?: Boolean,
    classNameInput?: string,
    iconClassName?: string,
}


const Input = ({ setFieldValue, value, name, type, field, required, maxLength, Icon, IconAction, SecondIcon, SecondIconAction, label, className, children, style, mixed, disabled, onClick, disabledModify, unstyled, classNameInput, iconClassName }: Props) => {
    // const theme = useGetTheme()

    const [focus, setFocus] = React.useState(false)


    // handle change of input value should change the formik state or the local state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: any = e.target.value

        // if the input is a number, convert it to a number
        if (['integer', 'float', 'decimal'].includes(type)) {
            if (value === '') {
                value = ''
            } else if (type === 'integer') {
                value = parseInt(value)
            } else {
                value = parseFloat(value)
            }
        }

        // update the formik state if field is defined
        if (field) {
            return setFieldValue(field, value)
        }

        // update the useState if field is not defined
        return setFieldValue(value)
    }

    return (
        <>
            <div className={
                clsx(
                    className,
                    !unstyled ? `input-primary ${disabledModify ? 'hover:border-l-border dark:hover:border-d-border' : ''}` : '',
                    {
                        'input-focus': focus,
                    },
                )}
            >
                {
                    !unstyled && (
                        <label className={`input-label`} htmlFor={name}>
                            <p className={`${disabledModify ? 'text-600' : ''}`}>
                                {label}
                                <span className="text-primary-main ml-1">{required ? '*' : ''}</span>
                            </p>
                        </label>
                    )
                }
                {
                    !children || (mixed && children) ? (
                        <div className="w-full" onClick={onClick}>
                            <input
                                id={name}
                                required={required}
                                autoComplete="off"
                                value={value ?? ''}
                                maxLength={maxLength}
                                type={['bigInteger', 'integer', 'float', 'decimal'].includes(type) ? 'number' : type}
                                onChange={handleChange}
                                className={`${!unstyled ? 'input-content' : ''} ${classNameInput}`}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                style={{
                                    ...style,
                                }}
                                disabled={disabled}
                            />
                            {children}
                        </div>
                    ) : (
                        children
                    )
                }
                {
                    Icon && (
                        <Icon className={iconClassName ? iconClassName : `input-icon ${!IconAction ? 'hover:text-600 cursor-default' : ''}`} onClick={() => IconAction ? IconAction() : {}} />
                    )
                }
                {
                    SecondIcon && (
                        <SecondIcon className={iconClassName ? iconClassName : `input-icon ${!IconAction ? 'hover:text-600 cursor-default' : ''}`} onClick={() => SecondIconAction ? SecondIconAction() : {}} />
                    )
                }
            </div>
            {
                field && (
                    <ErrorMessage name={field}>
                        {
                            (msg) => (
                                <div className="flex flex-row justify-start items-start text-error-main mb-4">
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


export default Input