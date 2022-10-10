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
}


const InputDate = ({ setFieldValue, value, name, field, required, label, className }: Props) => {
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
        }
    }

    // const handleDayClick: DayClickEventHandler = (day: any) => {
    //     setFieldValue(field, moment(day).format('yyyy-MM-DD'))
    // }

    const handleDayClick = (day: any) => {
        setPanelDate(day)
        setFieldValue(field, moment(day).format('yyyy-MM-DD'))
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
            className={
                className + ` w-full input-date`
            }
            mixed={true}
        >
            {open && (
                <div
                    className="absolute w-full"
                    ref={wrapperRef}
                >
                    <DayPicker
                        locale={fr}
                        className="input-date-picker top-[62px]"
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


export default InputDate