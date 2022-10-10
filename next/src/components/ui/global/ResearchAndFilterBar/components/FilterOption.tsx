import React from 'react'
import nestedProperty from 'nested-property';
import moment from 'moment';
import { useUpdatePresetByIdMutation } from 'graphql/generated/hooks';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md/index'


interface Props {
    fields: any[],
    field: any,
    depth: number,
    route: string,
    options: any,
    setOptions: any,
    currentPreset: any,
    setIsCustomizeFilterOpen?: any,
    setIsAddFilterOpen?: any,
    replaceIndex?: number,
    filters: any[],
    refetchPresets: any,
    currentUser: any,
}


const FilterOption = ({ currentUser, fields, field, depth, route, options, setOptions, currentPreset, setIsCustomizeFilterOpen, setIsAddFilterOpen, replaceIndex, filters, refetchPresets }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const [updatePreset] = useUpdatePresetByIdMutation()

    let routeString = route ? `${route}.${field[0].field}` : `${field[0].field}`

    let subCollection = field[0]?.schema?.foreign_key_table ?? null
    if (!subCollection || depth === 4) {
        // search in fields keys if fieldname or directus_fieldname exists if so use that
        subCollection = Object.keys(fields).find((key: string) => {
            if (key === field[0].field || key === ('directus_' + field[0].field + 's') || key === ('directus_' + field[0].field) || key === field[0].meta?.interface || key === ('directus_' + field[0].meta?.interface + 's')) {
                return true
            }

            return null
        })
    }

    const handleAddFilter = () => {
        let route = routeString.split('.').slice(1)
        let newFilters = options.filter
        let filterString = ''

        if (route.length > 0) {
            route.forEach((r: string) => {
                filterString += `{"${r}":`
            })

            if (field[0].type === 'integer') {
                filterString += `{"_eq": ${0}}`
            } else if (field[0].type === 'timestamp') {
                filterString += `{"_lte": "${moment().format()}"}`
            } else if (field[0].type === 'json') {
                filterString += `{"_nnull": true}`
            } else if (field[0].type === 'boolean') {
                filterString += `{"_eq": "true"}`
            } else if (field[0].type === 'uuid') {
                filterString += `{"_eq": ""}`
            } else if (field[0]?.meta?.options?.choices) {
                filterString += `{"_eq": "${field[0]?.meta?.options?.choices[0]?.value}"}`
            } else {
                if (field[0].defaultValue) {
                    filterString += `{"${field[0].filterName}": "${field[0].defaultValue}"}`
                } else {
                    filterString += `{"_contains": ""}`
                }
            }
            route.forEach(() => (filterString += '}'))
        }

        if (filters.find((filter) => (filter.fieldRoute === routeString))) {
            return
        }

        let newFilter = filterString
        if (newFilters._and && newFilters._and.length) {
            if (replaceIndex !== undefined) {
                newFilters._and[replaceIndex] = JSON.parse(newFilter)
            } else {
                newFilters._and.push(JSON.parse(newFilter))
            }
        } else {
            newFilters = JSON.parse(`{"_and": [${newFilter}]}`)
        }

        updatePreset({
            variables: {
                id: currentPreset.id,
                data: {
                    filter: newFilters,
                }
            }
        })

        if (setIsCustomizeFilterOpen) {
            setIsCustomizeFilterOpen(false)
        }
        if (setIsAddFilterOpen) {
            setIsAddFilterOpen(false)
        }

        return refetchPresets()
    }

    if (depth > 4) {
        return null
    }

    if (routeString.includes('password')) {
        return null
    }

    if (subCollection && depth < 4) {
        return (
            <div className="w-full ease-in duration-200">
                <li 
                    onClick={() => { setIsOpen(isOpen ? false : true) }}
                    className="flex items-center justify-between py-1.5 px-1.5 rounded hover:bg-main transition-all duration-200 ease-in"
                >
                    <p>
                        {field[0]?.meta?.translations?.find((lang: any) => lang?.language === "fr-FR")?.translation ?? field[0].field.split('_').map((name: string) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')}
                    </p>
                    {
                        !isOpen ? (
                            <MdKeyboardArrowRight />
                        ) : (
                            <MdKeyboardArrowDown />
                        )
                    }
                </li>
                {
                    isOpen && (
                        <ul className="bg-l-disabled dark:bg-d-disabled pl-8" >
                            {
                                fields && fields[subCollection] && nestedProperty.get(fields, subCollection) && (
                                    <>
                                        {
                                            Object.entries(nestedProperty.get(fields, subCollection)).map(([key, value], index) => {
                                                return <FilterOption
                                                    currentUser={currentUser}
                                                    key={index}
                                                    filters={filters}
                                                    field={value}
                                                    fields={fields}
                                                    depth={(depth + 1)}
                                                    route={routeString}
                                                    options={options}
                                                    setOptions={setOptions}
                                                    currentPreset={currentPreset}
                                                    setIsCustomizeFilterOpen={setIsCustomizeFilterOpen}
                                                    replaceIndex={replaceIndex}
                                                    refetchPresets={refetchPresets}
                                                />
                                            })
                                        }
                                    </>
                                )
                            }
                        </ul>
                    )
                }
            </div>
        )
    } else {
        let filterName = field[0]?.meta?.translations?.find((lang: any) => lang?.language === "fr-FR")?.translation ?? field[0].field.split('_').map((name: string) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ')

        if (filterName === 'Timestamp') {
            filterName = 'Date'
        }

        return (
            <li
                className="w-full py-1.5 px-1.5 rounded hover:bg-main transition-all duration-200 ease-in"
                onClick={handleAddFilter}
            >
                <div>
                    <p>
                        {filterName}
                    </p>
                </div>
            </li>
        )

    }
}


export default FilterOption