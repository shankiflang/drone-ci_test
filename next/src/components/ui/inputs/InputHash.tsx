import React from 'react'
import { MdOutlineVisibility } from 'react-icons/md/index'
import { MdOutlineVisibilityOff } from 'react-icons/md/index'
import Input from './Input'



interface Props {
    setFieldValue: any
    value: any
    name: string
    field?: string
    required?: boolean
    maxLength?: number
    Icon?: any
    label?: string
    className?: string,
}


const InputHash = ({ setFieldValue, value, name, field, required, maxLength, label, className }: Props) => {
    const [visibility, setVisibility] = React.useState(false)

    return (
        <Input
            setFieldValue={setFieldValue}
            value={value}
            name={name}
            type={visibility ? 'text' : 'password'}
            field={field}
            required={required}
            maxLength={maxLength}
            Icon={visibility ? MdOutlineVisibilityOff : MdOutlineVisibility}
            IconAction={() => setVisibility(!visibility)}
            label={label}
            className={className}
        />
    )
}


export default InputHash