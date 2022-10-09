import React from 'react'
import { FilterTypeProps } from '..';
import nestedProperty from 'nested-property';
import { Directus_Fields, useUpdatePresetByIdMutation } from 'graphql/generated/hooks';


interface Field {
    type: string,
}

interface Props {
    filterType: FilterTypeProps,
    filters: Array<any>,
    isTypeOpen: Boolean | number,
    fields: any[],
    currentPreset: any,
    filterTypes: FilterTypeProps[],
}


const FilterType = ({ fields, filterType, filters, isTypeOpen, currentPreset, filterTypes }: Props) => {
    const [field, setField] = React.useState(null)
    const [type, setType] = React.useState<FilterTypeProps | null | undefined>(null)

    const [updatePreset] = useUpdatePresetByIdMutation()

    React.useEffect(() => {
        setType(null)
        setField(null)

        if (typeof isTypeOpen === 'number') {
            let type = filterTypes.find(type => type.filterName === filters[isTypeOpen].type)
            let field = nestedProperty.get(fields, filters[isTypeOpen].fieldRoute)[0]

            setField(field)
            setType(type)
        }
    }, [filters, isTypeOpen])  // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateFilter = () => {
        if (typeof isTypeOpen === 'number' && field) {
            let newFilters = JSON.parse(JSON.stringify(currentPreset.filter))

            if (nestedProperty.get(newFilters._and[isTypeOpen], (filters[isTypeOpen].route))) {
                let value = Object.values(nestedProperty.get(newFilters._and[isTypeOpen], (filters[isTypeOpen].route)))[0]
                nestedProperty.set(newFilters._and[isTypeOpen], (filters[isTypeOpen].route), JSON.parse(`{"${filterType.filterName}": ${(field as Field).type === 'integer' ?
                    (
                        value === null || value === undefined
                            ?
                            "0"
                            :
                            parseInt(value as string)
                    ) : (
                        (((type?.type === filterType.type) || (`${type?.type}${filterType?.type}`.includes('all'))) && !(`${type?.type}${filterType?.type}`.includes('boolean'))) ? `"${value}"` : (filterType?.defaultValue ?? `""`)
                    )}}`))
            }

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

    if (!type && !field) {
        return null
    }

    // Si field est un integer et que filter est pas number ou all alors ne pas retourner le filtre
    if (
        typeof isTypeOpen === 'number' &&
        field &&
        (field as Field)?.type === "integer" &&
        filterType.type !== "number" &&
        filterType.type !== "all"
    ) {
        return null
    }

    // Si field pas un integer ou un timestamp alors pas retourner le filtre de type number
    if (
        typeof isTypeOpen === 'number' &&
        field &&
        (field as Field)?.type !== "integer" &&
        (field as Field)?.type !== "timestamp" &&
        filterType.type === "number"
    ) {
        return null
    }

    // Si field est un timestamp et que filtre pour les string alors pas le retourner
    if (
        typeof isTypeOpen === 'number' &&
        field &&
        (field as Field)?.type === "timestamp" &&
        filterType.type === "string"
    ) {
        return null
    }

    // Si field est un json et que filtre pas null ou nnull alors pas le retourner
    if (
        field &&
        (field as Field)?.type === "json" &&
        !(['_null', '_nnull'].includes(filterType.filterName))
    ) {
        return null
    }

    // Si field est une date et que filtre pas lt lte ou gt gte alors pas le retourner
    if (
        field &&
        (field as Field)?.type === "timestamp" &&
        !(['_lt', '_lte', '_gt', '_gte'].includes(filterType.filterName))
    ) {
        return null
    }

    // Si field est un select et que filtre pas egal ou negal alors pas le retourner
    if (
        field &&
        (field as any)?.meta?.options?.choices &&
        !(['_eq', '_neq'].includes(filterType.filterName))
    ) {
        return null
    }

    // Si field est un boolean et que filtre pas egal ou negal alors pas le retourner
    if (
        field &&
        (field as any)?.type === "boolean" &&
        !(['_eq', '_neq'].includes(filterType.filterName))
    ) {
        return null
    }

    // Si field est un uuid et que filtre pas egal ce qu'il faut alors return
    if (
        field &&
        (field as any)?.type === "uuid" &&
        !(['_eq', '_neq', '_null', '_nnull'].includes(filterType.filterName))
    ) {
        return null
    }

    return (
        <li onClick={handleUpdateFilter} className="w-full py-1.5 px-1.5 rounded hover:bg-main transition-all duration-200 ease-in">
            <div>
                <p>
                    {(field as any)!.type === "timestamp" ? filterType.nameDate : filterType.name}
                </p>
            </div>
        </li>
    )
}


export default FilterType