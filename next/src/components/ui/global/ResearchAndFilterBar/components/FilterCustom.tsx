import React, { useEffect } from 'react'
import nestedProperty from 'nested-property'
import moment from 'moment';
import { useUpdatePresetByIdMutation } from 'graphql/generated/hooks';
import { MdClear } from 'react-icons/md/index'
import InputDateRaw from 'components/ui/inputs/InputDateRaw';
import humanize from 'lib/utils/humanize';
import { useResponsive } from 'components/hooks/useResponsive';


interface Type {
    name: string,
    nameDate?: string,
    type: string,
    filterName: string,
    input: Boolean,
    defaultValue: any,
}

interface Field {
    type: string,
}


interface Props {
    index: number,
    options: any,
    filter: any,
    filterTypes: Array<any>,
    fields: any[],
    currentPreset: any,
    setIsCustomizeFilterOpen: any,
    setIsCustomizeTypeOpen: any,
    isCustomizeFilterOpen: Boolean | number,
    isCustomizeTypeOpen: Boolean | number,
    searchWidth: number,
}



const FilterCustom = ({ index, options, filter, filterTypes, fields, currentPreset, setIsCustomizeFilterOpen, setIsCustomizeTypeOpen, isCustomizeFilterOpen, isCustomizeTypeOpen, searchWidth }: Props) => {
    const screen = useResponsive();
    
    const [type, setType] = React.useState(null)
    const [field, setField] = React.useState(null)
    const [value, setValue] = React.useState<null | string>(null)
    const [filterName, setFilterName] = React.useState('')
    const [updatePreset] = useUpdatePresetByIdMutation()
    const [fieldType, setFieldType] = React.useState('all')

    const handleRemoveFilter = () => {
        let newFilters = options.filter
        newFilters._and.splice(index, 1)

        updatePreset({
            variables: {
                id: currentPreset.id,
                data: {
                    filter: newFilters,
                }
            }
        })
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (value !== null) {
                let newFilters = options.filter
                if (nestedProperty.get(newFilters._and[index], (filter.route)) !== undefined && field) {
                    nestedProperty.set(
                        newFilters._and[index],
                        (filter.route + '.' + filter.type),
                        (field as Field).type === 'integer' ?
                            (
                                value === null || value === undefined
                                    ?
                                    "0"
                                    :
                                    parseInt(value)
                            ) : (
                                value ?? ''
                            )
                    )

                    updatePreset({
                        variables: {
                            id: currentPreset.id,
                            data: {
                                filter: newFilters,
                            }
                        }
                    })
                }
            }
        }, 500)
        return () => clearTimeout(timeOutId);
    }, [value])  // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        let type = filterTypes.find(type => type.filterName === filter.type)
        let field = nestedProperty.get(fields, filter.fieldRoute)[0]

        if (filter.route) {
            let tempName: string = ""

            for (let i = 0; i < filter.detailedRoute.length; i++) {
                let currentField = nestedProperty.get(fields, filter.detailedRoute[i])[0]
                if (i > 0 ) {
                    tempName += ' -> '
                }
                if (currentField) {
                    tempName += currentField?.meta?.translations?.find((lang: any) => lang?.language === "fr-FR")?.translation ?? humanize(currentField?.field) ?? ""
                }
            }

            setFilterName(tempName)
        }
        
        setType(type)
        setField(field)
        setValue(filter.value)
    }, [filter])  // eslint-disable-line react-hooks/exhaustive-deps


    const handleSetValue = (_: any, value: any) => {
        setValue(moment(value).format())
    }

    useEffect(() => {
        if ((field as any)?.type === 'timestamp' || filterName.includes('date')) {
            return setFieldType('date')
        }

        if ((field as any)?.type === 'boolean') {
            return setFieldType('boolean')
        }

        if ((field as any)?.meta?.options?.choices) {
            return setFieldType('select')
        }

        return setFieldType('all')
    }, [type, field]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                filter && field && type && filterName && (
                    <li
                        className={`flex flex-row items-center justify-start mb-2 transition-search select-none ${(searchWidth >= 416 && ["2xl"].includes(screen)) ? 'w-fit' : `w-fit overflow-x-scroll`}`}
                        style={{ width: (searchWidth >= 416 && ["2xl"].includes(screen))  ? 'auto' : searchWidth ? (searchWidth - 12) : 'auto' }}
                    >
                        <div
                            className="h-[30px] m-0 py-0 pr-[2px] flex flex-row justify-start items-center bg-l-default dark:bg-d-default border-2 border-l-main dark:border-d-main rounded-3xl transition-search"
                        >
                            <div
                                id="filter-filtering"
                                className="py-0 cursor-pointer"
                                onClick={
                                    () => {
                                        setIsCustomizeFilterOpen(
                                            isCustomizeFilterOpen === false
                                                ?
                                                index
                                                :
                                                typeof isCustomizeFilterOpen === "number" && isCustomizeFilterOpen !== index
                                                    ?
                                                    index
                                                    :
                                                    false
                                        )
                                    }}
                            >
                                <p
                                    id="filter-filtering"
                                    className="transition-all text-[15px] text-200 whitespace-nowrap hover:bg-main px-2 ml-0.5 box-border capitalize"
                                    style={{
                                        borderRadius: '16px 4px 4px 16px',
                                    }}
                                >
                                    {filterName}
                                </p>
                            </div>
                            <div
                                id="type-filtering"
                                className="py-0 px-1 cursor-pointer"
                                onClick={
                                    () => {
                                        setIsCustomizeTypeOpen(
                                            isCustomizeTypeOpen === false
                                                ?
                                                index
                                                :
                                                typeof isCustomizeTypeOpen === "number" && isCustomizeTypeOpen !== index
                                                    ?
                                                    index
                                                    :
                                                    false
                                        )
                                    }
                                }
                            >
                                <p
                                    id="type-filtering"
                                    className="transition-all text-[15px] text-200 whitespace-nowrap hover:bg-main px-1 box-border rounded-[3px]">
                                    {fieldType === 'date' ? (type as unknown as Type)?.nameDate : (type as unknown as Type)?.name}
                                    {/* {(filter as Filter).filterName} */}
                                    {/* {type?.name ?? ''} */}
                                </p>
                            </div>
                            {
                                fieldType === 'all' && (type as unknown as Type)?.input && (
                                    <input
                                        className="box-border px-2 text-[15px] outline-none bg-main text-l-primary-light dark:text-d-primary-light h-[22px] w-[125px]"
                                        autoComplete='off'
                                        value={value ?? ''}
                                        style={{ borderRadius: '4px 16px 16px 4px' }}
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                    />
                                )
                            }
                            {
                                fieldType === 'date' && (
                                    <InputDateRaw
                                        className="flex justify-start items-center h-[22px] bg-main px-2 rounded-full w-fit overflow-hidden"
                                        classNameInput="bg-transparent outline-none text-l-primary-light dark:text-d-primary-light text-[15px] w-[110px]"
                                        iconClassName="text-400 w-5 h-5 cursor-pointer hover:text-300 transition-all"
                                        dateClassName="top-7 right-4 w-[320px]"
                                        value={value}
                                        setFieldValue={handleSetValue}
                                        name={'filter-date'}
                                        field={'timestamp'}
                                    />
                                )
                            }
                            {
                                fieldType === 'boolean' && (
                                    <input type="checkbox" className="mx-2 w-4 h-4 cursor-pointer" checked={value === "true" ?? false} onChange={() => setValue((value === "true") ? "false" : "true")} />
                                )
                            }
                            {
                                fieldType === 'select' && (
                                    <select
                                        className="w-fit cursor-pointer box-border pl-3 pr-3.5 text-[15px] outline-none bg-main hover:bg-l-dark dark:hover:bg-d-light text-l-primary-light dark:text-d-primary-light h-[22px] rounded-r-full appearance-none"
                                        onChange={(e) => setValue(e.target.value)}
                                        value={value ? value : ''}
                                    >
                                        {
                                            (field as any)?.meta?.options?.choices?.map((option: any) => (
                                                <option className="cursor-pointer" key={option.value} value={option.value}>{humanize(option.value)}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                        </div>
                        <MdClear
                            className="relative cursor-pointer min-w-[22px] min-h-[22px] pl-1 text-600 hover:text-like-hover dark:hover:text-like-hover ease-in-out duration-200"
                            onClick={handleRemoveFilter}
                        />
                    </li>
                )
            }
        </>
    )
}

export default FilterCustom