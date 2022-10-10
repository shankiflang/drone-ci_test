import React from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md/index'
import Input from './Input'
import useClickOutside from 'components/hooks/useClickOutside';
import humanize from 'lib/utils/humanize';


interface Props {
    setFieldValue: any
    value: any
    name: string
    values: any[]
    field?: string
    required?: boolean
    maxLength?: number
    Icon?: any
    label?: string
    className?: string,
    options?: {
        choices?: any[]
    }
}


const InputSelect = ({ setFieldValue, value, values, name, field, label, className, options, required }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const wrapperRef = React.useRef(null)

    useClickOutside(wrapperRef, () => {
        setIsOpen(false)
    })

    const handleChange = (value: any) => {
        setFieldValue(field, value)
        setIsOpen(false)
    }

    if (options && options.choices) {
        values = options.choices.map((choice: any) => {
            return {
                value: choice.value,
                name: humanize(choice.value),
            }
        })
    }

    return (
        <Input
            setFieldValue={setFieldValue}
            value={value}
            name={name}
            type={'select'}
            field={field}
            label={label}
            className={className}
            required={required}
        >
            <button
                type="button"
                ref={wrapperRef}
                aria-label={name}
                value={value}
                className='input-select'
                onClick={() => setIsOpen(!isOpen)}
            >
                {(value && values) ? values.find((pair) => (pair.value === value)).name : 'Sélectionner'}
            </button>
            {
                isOpen ? (
                    <MdKeyboardArrowUp className='input-select-icon' />
                ) : (
                    <MdKeyboardArrowDown className='input-select-icon' />
                )
            }
            <ul role="list" className={`input-option-list ${isOpen ? 'flex flex-col' : 'hidden'}`}>
                {
                    values.map((v: any, index: number) => (
                        <li
                            key={index}
                            onClick={() => handleChange(v.value)}
                            className="input-option"
                            aria-label={v.value}
                        >
                            {v.name}
                        </li>
                    ))
                }
            </ul>
        </Input>
    )
}


export default InputSelect