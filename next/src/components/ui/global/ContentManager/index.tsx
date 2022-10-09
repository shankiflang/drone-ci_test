import _ from 'lodash';
import nestedProperty from 'nested-property';
import React, { useEffect } from 'react';
import ContentHeader from './ContentHeader';
import ContentTable from './Table/ContentTable';
import ContentGrid from './Grid/ContentGrid';
import schemas from '../../../../graphql/schemas';
import { Directus_Fields, useCreatePresetMutation, useGetAllFieldsQuery, useGetPresetsByUsersIdQuery } from 'graphql/generated/hooks';
import usePagination from 'components/hooks/usePagination';
import { useLazyDeleteRecordMutation } from 'graphql/generated/client/useDeleteRecordMutation';
import { useUpdateRecordMutation } from 'graphql/generated/client/useUpdateRecordMutation';
import { useListRecordQuery } from 'graphql/generated/client/useListRecordQuery';
import Pagination from 'components/ui/global/Pagination'
import { useCurrentUser } from 'components/providers/UserProvider';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



export const updateRouteToFieldName = (routes: Array<string>, fields: Directus_Fields[], fs?: Directus_Fields[]) => {
    if (!fs) fs = fields
    let newRoute: any[] = []
    let lastField: Directus_Fields | undefined | Directus_Fields[] = undefined // eslint-disable-line

    routes.forEach((route: string, index: number) => {
        fs = nestedProperty.get(fs, route) ?? fields
        if (fs) {
            let tempRoute = route
            // if children doesn't have next iteration in object three then correct it
            if (routes.length >= index && !nestedProperty.get(fs, routes[index + 1])) {
                if (!Array.isArray(fs[0]) && fs[0]?.schema?.foreign_key_table) {
                    let tempFs = nestedProperty.get(fields, fs[0]?.schema?.foreign_key_table)
                    if (tempFs) {
                        newRoute.push(fs[0]?.schema?.foreign_key_table)
                        lastField = tempFs
                    }
                } else {
                    let specialRelation = undefined
                    let tempRoute = Object.keys(fields).find((key: string) => {
                        let found = false

                        if (
                            key === ('directus_' + route) ||
                            key === ('directus_' + route + 's')
                        ) {
                            return true
                        }

                        if (route.split('_')?.length) {
                            route.split('_').forEach((subRoute) => {
                                if (
                                    key === ('directus_' + subRoute) ||
                                    key === ('directus_' + subRoute + 's')
                                ) {
                                    found = true
                                }
                            })
                        }

                        // Autre check pour les fichiers ou relations spéciales
                        if (nestedProperty.get(fields, `${newRoute[newRoute.length - 1]}.${route}`)?.[0] && !found) {
                            let newRelation = nestedProperty.get(fields, `${newRoute[newRoute.length - 1]}.${route}`)[0]
                            if (newRelation?.meta?.interface) {
                                if (
                                    key === (newRelation?.meta?.interface)
                                ) {
                                    specialRelation = newRelation?.meta?.interface
                                }
                                if (
                                    key === (newRelation?.meta?.interface + 's')
                                ) {
                                    specialRelation = newRelation?.meta?.interface + 's'
                                }
                                if (
                                    key === ('directus_' + newRelation?.meta?.interface)
                                ) {
                                    specialRelation = 'directus_' + newRelation?.meta?.interface
                                }
                                if (
                                    key === ('directus_' + newRelation?.meta?.interface + 's')
                                ) {
                                    specialRelation = 'directus_' + newRelation?.meta?.interface + 's'
                                }
                                return null
                            }
                            if (newRelation?.schema?.foreign_key_table) {
                                if (
                                    key === newRelation?.schema?.foreign_key_table
                                ) {
                                    specialRelation = newRelation?.schema?.foreign_key_table
                                }
                                if (
                                    key === newRelation?.schema?.foreign_key_table + 's'
                                ) {
                                    specialRelation = newRelation?.schema?.foreign_key_table + 's'
                                }
                                if (
                                    key === ('directus_' + newRelation?.schema?.foreign_key_table)
                                ) {
                                    specialRelation = 'directus_' + newRelation?.schema?.foreign_key_table
                                }
                                if (
                                    key === ('directus_' + newRelation?.schema?.foreign_key_table + 's')
                                ) {
                                    specialRelation = 'directus_' + newRelation?.schema?.foreign_key_table + 's'
                                }
                                return null
                            }
                        }

                        if (found) {
                            return true
                        }

                        return null
                    })
                    if (tempRoute || specialRelation) {
                        if (!specialRelation && tempRoute) {
                            newRoute.push(tempRoute)
                            lastField = nestedProperty.get(fields, tempRoute)
                        } else if (specialRelation) {
                            newRoute.push(specialRelation)
                            lastField = nestedProperty.get(fields, specialRelation)
                        }
                    }
                }
                // fs = fields
            } else if (routes.length >= index && nestedProperty.get(fs, routes[index + 1])) {
                if (fs.length > 1) {
                    lastField = fs
                } else {
                    lastField = fs[0] // eslint-disable-line
                }
                newRoute.push(tempRoute)
            }
        }
    })

    return newRoute
}


interface ContentManagerCoreProps {
    currentUser: any,
    collection: string,
    options: any,
    setOptions: any,
    filters: any,
    fields: any,
    defaultFields: any,
    currentPreset: any,
    mode: string,
    type: string,
    refetchPresets: any,
    system?: boolean,
    handleSave?: any,
    currentSelectedIds?: Array<string> | undefined
    startFields?: string,
    gridProperties?: any,
    title?: string,
    Icon?: any,
    forceFields?: string,
    defaultFilter?: any,
    createAction?: any,
    deleteAction?: any,
    defaultUrl?: string,
    closeModal?: any,
    downloadable?: boolean,
}


const ContentManagerCore = ({
    currentUser,
    collection,
    options,
    setOptions,
    filters,
    fields,
    defaultFields,
    currentPreset,
    system,
    mode,
    type,
    handleSave,
    currentSelectedIds,
    gridProperties,
    title,
    Icon,
    defaultFilter,
    createAction,
    deleteAction,
    refetchPresets,
    defaultUrl,
    closeModal,
    downloadable,
}: ContentManagerCoreProps) => {
    const [records, setRecords] = React.useState<Array<any>>([])
    const [selected, setSelected] = React.useState<Array<any>>((currentSelectedIds && currentSelectedIds?.length > 0) ? [...currentSelectedIds] : [])

    const { offset, limit, numberOfRecords, numberOfPages, setPage, page, refetchPagination } = usePagination({ collection, options, recordsPerPage: 25, isSystem: system ?? false, defaultFilter })

    const [deleteRecords] = useLazyDeleteRecordMutation(collection, {}, system ?? false)
    const [updateRecords] = useUpdateRecordMutation(collection, 'id', {}, true, true)
    const { data, loading, error, refetch } = useListRecordQuery(
        collection,
        'id ' + defaultFields ?? schemas.find((schema: any) => schema.name === ((system ? 'directus_' : '') + collection))?.schema,
        {
            ...options,
            filter: {
                _and: (defaultFilter ?? []).concat(options?.filter?._and ?? [])
            },
            offset,
            limit
        },
        {
            fetchPolicy: 'network-only',
            nextFetchPolicy: 'cache-and-network'
        },
        system ?? false
    )


    const refreshAllData = () => {
        refetchPagination()
        refetch()
    }

    const handleArchieveSelected = async (archive: Boolean) => {
        let ids = selected.map((id) => (id))
        await updateRecords({
            variables: {
                ids,
                item: {
                    status: archive ? 'archived' : 'active'
                }
            },
            onCompleted: (data: any) => {
                let idsToRemove = data[`update_${collection}_items`].map((item: any) => (item.id))
                setSelected(selected.filter((id) => !idsToRemove.includes(id)))
                toast.success(`${idsToRemove.length} élément${idsToRemove.length > 1 ? 's' : ''} ${(archive) ? ('archivé' + ((idsToRemove.length > 1) ? 's' : '')) : ('restoré' + ((idsToRemove.length > 1) ? 's' : ''))}`)
                refetchPagination()
                refetch()
            },
            onError: (error: any) => {
                toast.error("Une erreur est survenue lors de l'archivage.")
            }
        })
    }

    const handleDeleteSelected = async () => {
        let ids = selected.map((id) => (id))
        await deleteRecords({
            variables: {
                ids,
            },
            onCompleted: (data: any) => {
                let idsToRemove = data[`delete_${collection}_items`].ids
                setSelected(selected.filter((id) => !idsToRemove.includes(id)))
                toast.success(`${idsToRemove.length} élément${idsToRemove.length > 1 ? 's' : ''} supprimé${idsToRemove.length > 1 ? 's' : ''}`)
                refetchPagination()
                refetch()
            },
            onError: () => {
                toast.error('Une erreur est survenue lors de la suppression.')
            }
        })
    }

    // 2.1 getAllRecords
    useEffect(() => {
        if (collection && options?.filter && defaultFields && !defaultFields.includes('undefined')) {
            refetchPagination()
            refetch()
        }
    }, [options, defaultFields, collection, history]) // eslint-disable-line

    // 2.2 update records
    useEffect(() => {
        if (data && collection && data[collection] && !loading && !error) {
            setRecords(data[collection])
        }
    }, [data, loading]) // eslint-disable-line

    return (
        <div className="w-full h-full flex flex-col items-start justify-start overflow-auto">
            {
                filters && fields && (
                    <ContentHeader
                        defaultUrl={defaultUrl}
                        currentUser={currentUser}
                        title={title}
                        Icon={Icon}
                        collection={collection}
                        options={options}
                        setOptions={setOptions}
                        records={data}
                        numberOfRecords={numberOfRecords}
                        filters={filters}
                        fields={fields}
                        currentPreset={currentPreset}
                        mode={mode}
                        handleSave={handleSave}
                        selected={selected}
                        system={system}
                        handleDeleteSelected={handleDeleteSelected}
                        createAction={createAction}
                        deleteAction={deleteAction}
                        refreshAllData={refreshAllData}
                        refetchPresets={refetchPresets}
                        handleArchieveSelected={handleArchieveSelected}
                        closeModal={closeModal}
                        downloadable={downloadable}
                    />
                )
            }
            {
                !error && records && records?.length > 0 && (
                    <>
                        {
                            type === "table" && (
                                <ContentTable
                                    records={records}
                                    preset={currentPreset}
                                    mode={mode}
                                    selected={selected}
                                    setSelected={setSelected}
                                    collection={collection}
                                    options={options}
                                    setOptions={setOptions}
                                    refetchPresets={refetchPresets}
                                    system={system}
                                    fields={fields}
                                    defaultUrl={defaultUrl}
                                />
                            )
                        }
                        {
                            type === "grid" && (
                                <ContentGrid
                                    records={records}
                                    preset={currentPreset}
                                    mode={mode}
                                    selected={selected}
                                    setSelected={setSelected}
                                    collection={collection}
                                    options={options}
                                    setOptions={setOptions}
                                    refetchPresets={refetchPresets}
                                    system={system}
                                    gridProperties={gridProperties}
                                    defaultUrl={defaultUrl}
                                />
                            )
                        }
                        {
                            numberOfPages > 1 && (
                                <Pagination page={page} setPage={setPage} numberOfPages={numberOfPages} />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}


interface ContentManagerProps {
    collection: string,
    mode: string,
    type: string,
    system?: boolean,
    handleSave?: any,
    currentSelectedIds?: Array<string> | undefined,
    startFields?: string,
    gridProperties?: any,
    title?: string,
    Icon?: any,
    forceFields?: string,
    defaultFilter?: any,
    defaultFilterName?: string,
    defaultOrderValue?: string,
    createAction?: any,
    deleteAction?: any,
    defaultUrl?: any,
    closeModal?: any,
    downloadable?: boolean,
}

const ContentManager = ({ collection, mode, type, handleSave, system, currentSelectedIds, startFields, gridProperties, title, Icon, forceFields, defaultFilter, defaultFilterName, defaultOrderValue, createAction, deleteAction, defaultUrl, closeModal, downloadable }: ContentManagerProps) => {
    /*
    *
    *  State managers
    *  
    *  defaultFields: default fields to be loaded from the backend
    *  setCurrentPreset: set the current preset
    *  options: options to be used for the current collection
    *
    */
    const [defaultFields, setDefaultFields] = React.useState<string | undefined>(forceFields ?? undefined);
    const [currentPreset, setCurrentPreset] = React.useState<any | undefined>(undefined)
    const [options, setOptions] = React.useState<any>({ search: '' });
    const [filters, setFilters] = React.useState<undefined | Array<any>>(undefined)
    const [fields, setFields] = React.useState<undefined | any>(undefined)


    /*
    *
    *  Data hooks
    * 
    *  currentUser: get the current user
    *  fieldsUnordored: get all fields
    *  getAllPresets: get all presets by user id
    *  getAllRecords: get all records by collection name
    *  createPreset: create a preset
    * 
    */
    const { user: currentUser } = useCurrentUser()
    const { data: { fields: fieldsUnordored } = {} } = useGetAllFieldsQuery()
    const { data: presetRecords, refetch: refetchPresets, loading: loadingPresets } = useGetPresetsByUsersIdQuery(
        {
            variables: {
                filter: {
                    user: {
                        id: {
                            _eq: currentUser?.id
                        }
                    }
                }
            },
            fetchPolicy: 'network-only',
        }
    )
    const [createPreset] = useCreatePresetMutation()


    /*
    *
    *  Functions
    * 
    *  translateTypes: translate the field types to number or string correctly
    * 
    */
    const scanObjectFirst = (obj: any, route?: any) => {
        if (!route) route = ''
        if (typeof obj === "object") {
            if (
                obj &&
                typeof Object.values(obj) === "object" &&
                Object.entries(obj)[0]?.length
            ) {
                let [key, value] = Object.entries(obj)[0]
                route = scanObjectFirst(value, (route === '' ? key : route + '.' + key))
            }
        }

        return route
    }

    const updateAllKeys = (filters: Array<any>, keys: Array<string>) => {
        let newFilters: any[] = []
        let routes: any[] = []
        filters.forEach((filter: any, index: number) => {
            let route = scanObjectFirst(filter)
            if (route) {
                let newFilter = JSON.parse(JSON.stringify(filters[index]))
                let value = nestedProperty.get(newFilter, route)
                nestedProperty.set(
                    newFilter,
                    route,
                    keys.includes(route.split('.').pop())
                        ?
                        (
                            typeof value === 'string' ? (
                                value
                            ) : (
                                (
                                    isNaN(value) ||
                                    value === null ||
                                    value === undefined
                                )
                                    ?
                                    "0"
                                    :
                                    parseInt(value)
                            )
                        )
                        :
                        value?.toString()
                )

                newFilters.push(newFilter)
                routes.push(route)
            }
        })

        return { newFilters, routes }
    }


    /*
    *
    *  Effects
    * 
    *  1.1 - get all presets by user id
    *  1.2 - set the current preset
    *  1.3 - get collection default fields
    * 
    *  2.1 - get all records by collection name with correct options and default fields
    * 
    */

    // 1.2 Set the preset of the collection, if it does not exist, create a new preset
    useEffect(() => {
        if (presetRecords !== undefined && currentUser && fields && defaultFields && !loadingPresets) {
            // get the preset of the collection
            let preset = _.find(presetRecords?.presets, { collection: (defaultFilterName) ? collection + defaultFilterName : collection })
            let widths: any = {}

            let dF = defaultFields
            if (defaultFields.includes('{')) {
                dF = defaultFields.replace(/ \{[\s\S]*?\}/g, '')
            }
            dF.split(' ').forEach((field: string) => (widths[field as string] = 150))

            if (!preset) {
                createPreset(
                    {
                        variables: {
                            data: {
                                collection: (defaultFilterName) ? collection + defaultFilterName : collection,
                                user: {
                                    id: currentUser.id,
                                    status: currentUser.status,
                                    provider: currentUser.provider,
                                },
                                layout_options: {
                                    tabular: {
                                        widths
                                    }
                                },
                                layout_query: {
                                    tabular: {
                                        fields: dF.split(' '),
                                        sort: defaultOrderValue ? [defaultOrderValue] : ['id']
                                    }
                                },
                                icon: '',
                            }
                        },
                        onCompleted: async (newPreset) => {
                            setCurrentPreset(newPreset.create_presets_item)
                            setOptions({ ...options, filter: {}, search: '', sort: defaultOrderValue ? [defaultOrderValue] : ['id'] })
                            setFilters([])
                        }
                    }
                )
            } else {
                let formattedFilters = preset.filter
                    ?
                    preset.filter._and
                        ?
                        preset.filter._and
                        :
                        [preset.filter]
                    :
                    []

                let { newFilters, routes } = updateAllKeys(formattedFilters, ['_eq', '_neq', '_gt', '_gte', '_lt', '_lte', '_in', '_nin'])

                let filters = newFilters.map((filter: any, index: number) => {
                    
                    let tempFieldRoute = (collection + '.' + routes[index]).split('.').slice(0, -1).join('.')

                    let newRoute = updateRouteToFieldName(tempFieldRoute.split('.'), fields).slice(-2).join('.')
            
                    let max = tempFieldRoute.split('.').length - 1
                    let detailedRoute: any[] = []

                    for (let i = 0; i < max - 1; i++) {
                        detailedRoute.push(
                            updateRouteToFieldName(tempFieldRoute.split('.').slice(0, i + 2), fields).slice(-2).join('.')
                        )
                    }
                    detailedRoute.push(newRoute)

                    return {
                        value: nestedProperty.get(filter, routes[index]),
                        type: routes[index].split('.').pop(),
                        detailedRoute: detailedRoute,
                        fieldRoute: newRoute,
                        route: routes[index].split('.').slice(0, -1).join('.')
                    }
                })

                setCurrentPreset(preset)
                setOptions({ ...options, filter: { _and: newFilters }, search: preset.search, sort: preset.layout_query?.tabular.sort ?? null })
                setFilters(filters)
            }
        }
    }, [presetRecords, fields, loadingPresets]) // eslint-disable-line
    // 1.3 Get collection default fields
    useEffect(() => {
        if (presetRecords !== undefined && currentUser && fieldsUnordored) {
            // get the preset of the collection
            let preset = _.find(presetRecords?.presets, { collection: (defaultFilterName) ? collection + defaultFilterName : collection })
            let newFields = 'id '
            let schema = schemas.find((schema: any) => schema.name === ((system ? 'directus_' : '') + collection))?.schema

            if (!forceFields) {
                if (preset) {
                    if (preset?.layout_options?.tabular?.widths && Object.keys(preset?.layout_options?.tabular?.widths)?.length && schema) {
                        // si preset existe alors charger les tables correspondantes
                        newFields = (newFields + (schema.split(',')).filter((f) => {
                            // try to find a match in widths
                            if (Object.keys(preset?.layout_options?.tabular?.widths).find((key) => (f.split('{')[0].includes(key)))) {
                                return true
                            } else {
                                return false
                            }
                        }).join(','))
                    }
                } else {
                    if (startFields) {
                        newFields = startFields
                    } else {
                        // si preset existe mais pas de table alors ajouter celles par defaut
                        newFields = fieldsUnordored.filter((field) => field?.collection === ((system ? 'directus_' : '') + collection)).filter(
                            (field) =>
                                !['id', 'sort', 'date_created', 'user_created', 'date_updated', 'user_updated'].includes(field?.schema?.name ?? '') &&
                                (field?.type === 'string' || field?.type === 'text' || (field?.type === 'uuid' && field?.schema?.foreign_key_table))
                        )
                            .slice(0, 3)
                            .map((field) => {
                                if (field?.type === 'string' || field?.type === 'text') {
                                    return `${field?.field}`
                                } else if (field?.schema?.foreign_key_table) {
                                    if (field?.schema?.foreign_key_table === 'directus_users') {
                                        return `${field?.field} { id email provider status }`
                                    } else if (field?.schema?.foreign_key_table === 'directus_files') {
                                        return `${field?.field} { id modified_on type title storage filename_download uploaded_on }`
                                    } else {
                                        return `${field?.field} { id }`
                                    }
                                }
                            })
                            .join(' ')
                    }
                }
            }

            let orderedFields = _.groupBy(fieldsUnordored, 'collection')
            Object.entries(orderedFields).forEach(([key, value]) => {
                // @ts-expect-error
                return orderedFields[key] = _.groupBy(value, 'field')
            })

            if (!forceFields) {
                setDefaultFields(newFields)
            } else {
                setDefaultFields(forceFields)
            }

            return setFields(orderedFields)
        }
    }, [fieldsUnordored, collection, presetRecords]) // eslint-disable-line

    return (
        <>
            {
                collection && options && filters && fields && currentPreset && currentUser ? (
                    <ContentManagerCore
                        currentUser={currentUser}
                        refetchPresets={refetchPresets}
                        collection={collection}
                        options={options}
                        setOptions={setOptions}
                        filters={filters}
                        fields={fields}
                        currentPreset={currentPreset}
                        defaultFields={defaultFields}
                        mode={mode}
                        type={type}
                        system={system}
                        handleSave={handleSave}
                        currentSelectedIds={currentSelectedIds}
                        gridProperties={gridProperties}
                        title={title}
                        Icon={Icon}
                        defaultFilter={defaultFilter}
                        createAction={createAction}
                        deleteAction={deleteAction}
                        defaultUrl={defaultUrl}
                        closeModal={closeModal}
                        downloadable={downloadable}
                    />
                ) : (
                    <>
                        {
                            type === 'grid' ? (
                                <div className="flex flex-col w-full">
                                    <div className="w-full flex flex-row justify-between items-start my-8 px-8 h-14">
                                        <div className="flex flex-row justify-start items-center h-14">
                                            <div className="rounded-full w-11 h-11 overflow-hidden">
                                                <Skeleton className="h-full" />
                                            </div>
                                            <div className="ml-4 w-24">
                                                <Skeleton className="h-full" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-start items-center h-14">
                                            <div className="w-11 h-11 rounded-full overflow-hidden">
                                                <Skeleton className="h-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full p-8 pt-0">
                                        <div className="w-full h-12 my-0">
                                            <Skeleton className="h-full" />
                                        </div>
                                        <div className="w-full flex flew-wrap gap-y-8 gap-x-6 mt-10">
                                            <div className="relative w-[160px] h-[160px]">
                                                <Skeleton className="h-full" />
                                            </div>
                                            <div className="relative w-[160px] h-[160px]">
                                                <Skeleton className="h-full" />
                                            </div>
                                            <div className="relative w-[160px] h-[160px]">
                                                <Skeleton className="h-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col w-full">
                                    <div className="w-full flex flex-row justify-between items-start my-8 px-8 h-14">
                                        <div className="flex flex-row justify-start items-center h-14">
                                            <div className="rounded-full w-11 h-11 overflow-hidden">
                                                <Skeleton className="h-full" />
                                            </div>
                                            <div className="ml-4 w-24">
                                                <Skeleton className="h-full" />
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-start items-center h-14">
                                            <div className="w-11 h-11 rounded-full overflow-hidden">
                                                <Skeleton className="h-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full p-8 pt-0">
                                        <div className="w-full h-12 my-0">
                                            <Skeleton className="h-full" />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )
}



export default ContentManager