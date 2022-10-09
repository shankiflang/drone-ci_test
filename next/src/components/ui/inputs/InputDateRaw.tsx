import React from 'react'
import Input from './Input'
import moment from 'moment'
import { MdOutlineDateRange } from 'react-icons/md/index'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import fr from 'date-fns/locale/fr'
import useClickOutside from 'components/hooks/useClickOutside'



interface Props {
    setFieldValue: any
    value: any
    name: string
    field?: string
    required?: boolean
    label?: string
    className?: string,
    classNameDate?: string,
    classNameInput?: string,
    iconClassName?: string,
    dateClassName?: string,
}


const InputDateRaw = ({ setFieldValue, value, name, field, required, label, className, classNameDate, classNameInput, iconClassName, dateClassName }: Props) => {
    const [open, setOpen] = React.useState(false)
    const [panelDate, setPanelDate] = React.useState(new Date(value))

    const wrapperRef = React.useRef(null)

    useClickOutside(wrapperRef, () => {
        setOpen(false)
    })


    const handleChange = (date: Date) => {
        if (moment(date).format('yyyy-MM-DD') !== 'Invalid date') {
            setPanelDate(new Date(date))
            setFieldValue(field, moment(date).format())
            setOpen(false)
        }
    }

    const handleDayClick = (day: any) => {
        setPanelDate(day)
        setFieldValue(field, moment(day).format('yyyy-MM-DD'))
        setOpen(false)
    }

    return (
        <Input
            setFieldValue={handleChange}
            value={value ? moment(value).format('yyyy-MM-DD') : ''}
            type={'date'}
            label={label}
            name={name}
            required={required}
            Icon={MdOutlineDateRange}
            IconAction={() => setOpen(!open)}
            iconClassName={iconClassName}
            className={className}
            classNameInput={classNameInput}
            mixed={true}
            unstyled={true}
        >
            {open && (
                <div
                    className={classNameDate}
                    ref={wrapperRef}
                >
                    <DayPicker
                        locale={fr}
                        className={`input-date-picker ${dateClassName}`}
                        mode="single"
                        defaultMonth={value ? new Date(value) : new Date()}
                        onSelect={handleDayClick}
                        selected={panelDate}
                        modifiersClassNames={{
                            selected: 'rdp-selected'
                        }}
                        fixedWeeks
                    />
                </div>
            )}
        </Input>
    )
}


export default InputDateRaw