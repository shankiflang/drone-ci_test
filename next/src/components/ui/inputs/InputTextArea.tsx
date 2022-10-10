import React from 'react'
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
    rows?: number,
    cols?: number,
}


const InputTextArea = ({ setFieldValue, value, name, field, required, maxLength, label, className, rows, cols }: Props) => {
    // const theme = useGetTheme()
    const [focus, setFocus] = React.useState(false)


    // handle change of input value should change the formik state or the local state
    const handleChange = (e: any) => {
        let value: any = e.target.value

        // update the formik state if field is defined
        if (field) {
            return setFieldValue(field, value)
        }

        // update the useState if field is not defined
        return setFieldValue(value)
    }

    return (
        <Input
            setFieldValue={setFieldValue}
            value={value}
            name={name}
            type={'textarea'}
            field={field}
            required={required}
            maxLength={maxLength}
            label={label}
            className={className}
        >
            <textarea
                id={name}
                required={required}
                autoComplete="off"
                value={value ?? ''}
                maxLength={maxLength}
                onChange={handleChange}
                className={'input-content resize-none w-full h-full'}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                rows={rows}
                cols={cols}
            />
        </Input>
    )
}


export default InputTextArea