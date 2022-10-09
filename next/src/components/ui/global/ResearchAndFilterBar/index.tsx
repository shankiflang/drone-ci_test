import React, { useEffect } from 'react'
import clsx from 'clsx'
import FilterOption from './components/FilterOption';
import FilterCustom from './components/FilterCustom';
import { useMeasure } from 'react-use';
import { useUpdatePresetByIdMutation } from 'graphql/generated/hooks';
import useClickOutside from 'components/hooks/useClickOutside';
import { MdOutlineFilterList } from 'react-icons/md/index';
import { IoMdSearch } from 'react-icons/io/index';
import { GrAdd } from 'react-icons/gr/index';
import { MdExpandMore, MdExpandLess } from 'react-icons/md/index';
import nestedProperty from 'nested-property';
import FilterType from './components/FilterType';
import { useResponsive } from 'components/hooks/useResponsive';


export interface Filter {
    field: string,
    fieldComplete: string,
    type: string,
    value: string,
    route: string,
    filterName: string,
    filterType: string,
}

export type dynamicName = {
    name: string,
    type: string,
}

export type FilterTypeProps = {
    name: string,
    nameDate: string,
    type: string,
    filterName: string,
    defaultValue?: string,
    input: Boolean
}


const filterTypes = [
    {
        name: 'Contiens',
        type: "string",
        filterName: '_contains',
        input: true,
    },
    {
        name: "Ne contiens pas",
        type: "string",
        filterName: '_ncontains',
        input: true,
    },
    {
        name: 'Commence avec',
        type: "string",
        filterName: '_starts_with',
        input: true,
    },
    {
        name: "Ne commence pas avec",
        type: "string",
        filterName: '_nstarts_with',
        input: true,
    },
    {
        name: 'Finis avec',
        type: "string",
        filterName: '_ends_with',
        input: true,
    },
    {
        name: "Ne finis pas avec",
        type: "string",
        filterName: '_nends_with',
        input: true,
    },
    {
        name: 'Égal à',
        type: "all",
        filterName: '_eq',
        input: true,
    },
    {
        name: "N'est pas égal à",
        type: "all",
        filterName: '_neq',
        input: true,
    },
    {
        name: "Est vide",
        type: "boolean",
        filterName: '_empty',
        input: false,
        defaultValue: true
    },
    {
        name: "N'est pas vide",
        type: "boolean",
        filterName: '_nempty',
        input: false,
        defaultValue: true
    },
    {
        name: 'Est égal à null',
        type: "boolean",
        filterName: '_null',
        input: false,
        defaultValue: true
    },
    {
        name: "N'est pas égal à null",
        type: "boolean",
        filterName: '_nnull',
        input: false,
        defaultValue: true
    },
    {
        name: "Plus petit que",
        nameDate: "Avant le",
        type: "number",
        filterName: '_lt',
        input: true,
    },
    {
        name: "Plus petit ou égal à",
        nameDate: "Avant ou le",
        type: "number",
        filterName: '_lte',
        input: true,
    },
    {
        name: "Plus grand que",
        nameDate: "Après le",
        type: "number",
        filterName: '_gt',
        input: true,
    },
    {
        name: "Plus grand ou égal à",
        nameDate: "Après ou le",
        type: "number",
        filterName: '_gte',
        input: true,
    },
]



interface Props {
    currentUser: any,
    collection: string,
    options: any,
    setOptions: any,
    filters: any[],
    fields: any[],
    currentPreset: any,
    system?: boolean,
    refetchPresets: any,
}



const ResearchAndFilterBar = ({ currentUser, collection, options, setOptions, filters, fields, currentPreset, system, refetchPresets }: Props) => {
    const screen = useResponsive()

    const wrapperRef = React.useRef(null)
    const wrapperFilterRef = React.useRef(null)
    const wrapperAddRef = React.useRef(null)
    const wrapperTypeRef = React.useRef(null)


    const [updatePreset] = useUpdatePresetByIdMutation()

    /*
    *
    *  State managers
    *  
    *  filter: array of active filters
    *
    */
    const [search, setSearch] = React.useState<string>(currentPreset.search)
    const [isSearchingOpen, setIsSearchingOpen] = React.useState(currentPreset.search ? true : false)
    const [isFilteringOpen, setIsFilteringOpen] = React.useState(false)
    const [isAddFilterOpen, setIsAddFilterOpen] = React.useState(false)
    const [isCustomizeFilterOpen, setIsCustomizeFilterOpen] = React.useState<Boolean | number>(false)
    const [isCustomizeTypeOpen, setIsCustomizeTypeOpen] = React.useState<Boolean | number>(false)

    /*
    *
    *  Effects
    * 
    * 
    */
    // 1.1 - Update preset search when field has been changed and inactive for 0.2s
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            updatePreset({
                variables: {
                    id: currentPreset.id,
                    data: {
                        search,
                    }
                }
            })
            setOptions({ ...options, search })
        }, 500)
        return () => clearTimeout(timeOutId);
    }, [search])  // eslint-disable-line react-hooks/exhaustive-deps

    // 2.1 - When we exit the search bar, close the search bar
    const handleLeaveBar = () => {
        if (search === '') {
            setIsSearchingOpen(false)
        }
        setIsFilteringOpen(false)
        setIsAddFilterOpen(false)
        setIsCustomizeFilterOpen(false)
        setIsCustomizeTypeOpen(false)
    }

    useClickOutside(wrapperRef, (e: any) => {
        let pathString = e.path.map((v: any) => v?.className ? v.className : '').join(',')
        if (pathString.includes('rdp') || pathString.includes('MuiBackdrop-root')) {
            return
        }

        handleLeaveBar()
    })
    useClickOutside(wrapperFilterRef, (e: any) => {
        if (e.target.id === 'filter-filtering') {
            return
        }
        if (e.target.id === 'filter-date') {
            return
        }

        setIsCustomizeFilterOpen(false)
    })
    useClickOutside(wrapperAddRef, (e: any) => {
        if (e.target.id === 'sub-filtering') {
            return
        }
        if (e.target.id === 'filter-date') {
            return
        }

        setIsAddFilterOpen(false)
    })
    useClickOutside(wrapperTypeRef, (e: any) => {
        if (e.target.id === 'type-filtering') {
            return
        }
        if (e.target.id === 'filter-date') {
            return
        }

        setIsCustomizeTypeOpen(false)
    })


    // 2.2 - When we exit the filter bar, close the filter bar
    const [refSearch, { width: searchWidth }] = useMeasure<HTMLDivElement>();
    const [ref, { width: filtersWidth }] = useMeasure<HTMLDivElement>();

    return (
        <div
            ref={wrapperRef}
            className={
                clsx(
                    "relative flex items-center max-w-full h-11 border-2 border-border overflow-hidden rounded-3xl transition-search hover:border-l-border-dark dark:hover:border-d-border-light no-hover",
                    {
                        ["overflow-visible rounded-b-none open"]: isFilteringOpen
                    }
                )
            }
            style={{
                width: (isSearchingOpen && !isFilteringOpen) ? (
                    '300px'
                ) : (
                    isFilteringOpen ? (
                        '420px'
                    ) : (
                        '76px'
                    )
                )
            }}
        >
            <div className="absolute w-full" ref={refSearch} />
            <IoMdSearch
                className="cursor-pointer w-6 h-6 my-0 ml-2 mr-0 text-300 hover:text-l-primary-light dark:hover:text-l-primary-light transition-all duration-200"
                onClick={() => { setIsSearchingOpen(true) }}
            />
            <input
                className="flex-grow w-0 h-full pl-2 m-0 text-300 text-ellipsis border-none rounded-none no-underline outline-none bg-transparent"
                placeholder="Rechercher"
                defaultValue={currentPreset.search}
                onChange={(e) => { setSearch(e.target.value) }}
            />
            {
                filters && filters?.length > 0 && !isFilteringOpen ? (
                    <div
                        onClick={() => { setIsFilteringOpen(true) }}
                    >
                        <p className="absolute rounded-full bg-l-primary-main dark:bg-d-primary-main text-xs w-3.5 h-3.5 flex justify-center items-center bottom-1.5 right-1.5">{filters.length}</p>
                        <MdOutlineFilterList className="cursor-pointer w-6 h-6 my-0 ml-0 mr-2 text-300 hover:text-l-primary-light dark:hover:text-l-primary-light transition-all duration-200" />
                    </div>
                ) : (
                    <MdOutlineFilterList onClick={() => { setIsFilteringOpen(true) }} className="cursor-pointer w-6 h-6 my-0 ml-0 mr-2 text-300 hover:text-l-primary-light dark:hover:text-l-primary-light transition-all duration-200" />
                )
            }
            {<div
                className={
                    `absolute top-full -right-0.5 p-0 border-2 bg-disabled border-border rounded-b-3xl z-10 transition-height ${isFilteringOpen === true ? 'overflow-transition rounded-tl-lg h-auto scale-y-100' : 'scale-y-0'}`
                }
                ref={ref}
                style={{
                    minWidth: isFilteringOpen ? `${searchWidth + 4}px` : '76px',
                    width: (searchWidth >= 416 && ["2xl"].includes(screen))  ? 'auto' : `${searchWidth + 4}px`,
                    borderTopLeftRadius: filtersWidth <= searchWidth ? '0px' : ((filtersWidth - searchWidth) > 22) ? 22 : (filtersWidth - searchWidth) + 'px',
                }}
            >
                <div
                    className={`py-2.5 px-2 transition-height ${(searchWidth >= 416 && ["2xl"].includes(screen)) ? 'min-w-full w-fit' : ``}`}
                >
                    {
                        filters?.length > 0 && (
                            <ul className="mb-2 p0 w-fit transition-search">
                                {
                                    filters.map((filter, index) => {
                                        return (
                                            <FilterCustom
                                                searchWidth={searchWidth}
                                                key={index}
                                                index={index}
                                                options={options}
                                                filter={filter}
                                                filterTypes={filterTypes}
                                                fields={fields}
                                                currentPreset={currentPreset}
                                                setIsCustomizeFilterOpen={setIsCustomizeFilterOpen}
                                                setIsCustomizeTypeOpen={setIsCustomizeTypeOpen}
                                                isCustomizeFilterOpen={isCustomizeFilterOpen}
                                                isCustomizeTypeOpen={isCustomizeTypeOpen}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        )
                    }
                    <div
                        className="flex-grow m-0 text-secondary-main overflow-hidden bg-default rounded-3xl flex flex-row items-center justify-start cursor-pointer border-2 border-l-main dark:border-d-dark hover:border-l-border dark:hover:border-d-main ease-in duration-200"
                        onClick={
                            () => {
                                setIsAddFilterOpen(isAddFilterOpen ? false : true)
                            }
                        }
                    >
                        <div
                            className="absolute w-full h-[30px] box-border text-xl"
                            id="sub-filtering"
                        />
                        <GrAdd className="w-3.5 h-3.5 ml-1.5 mr-2 text-600 text-xl svg-stroke" />
                        <input
                            className="cursor-pointer flex-grow text-sm bg-transparent outline-none"
                            style={{ flexGrow: 1 }}
                            placeholder="Ajouter un filtre"
                            readOnly
                            autoComplete='off'
                        />
                        {
                            !isAddFilterOpen ? (
                                <MdExpandMore className="mr-1.5 text-600 text-2xl" />
                            ) : (
                                <MdExpandLess className="mr-1.5 text-600 text-2xl" />
                            )
                        }
                    </div>
                </div>
                <ul
                    className={clsx
                        (
                            "max-h-[40vh] px-3.5 pb-2 overflow-x-hidden overflow-y-scroll",
                            {
                                ["hidden"]: !isAddFilterOpen,
                                ["visible flex flex-col items-start justify-start text-200 text-sm z-10 cursor-pointer"]: isAddFilterOpen
                            }
                        )
                    }
                    style={{
                        top: (isAddFilterOpen)
                            ?
                            `${40 + (filters.length * 38)}px`
                            :
                            '0px'
                    }}
                    ref={wrapperAddRef}
                >
                    {
                        fields && nestedProperty.get(fields, (system ? 'directus_' : '') + collection) && (
                            <>
                                {
                                    Object.entries(nestedProperty.get(fields, (system ? 'directus_' : '') + collection)).map(([key, value], index) => {
                                        return <FilterOption
                                            currentUser={currentUser}
                                            filters={filters}
                                            options={options}
                                            setOptions={setOptions}
                                            key={index}
                                            fields={fields}
                                            field={value}
                                            depth={0}
                                            route={collection}
                                            currentPreset={currentPreset}
                                            setIsAddFilterOpen={setIsAddFilterOpen}
                                            refetchPresets={refetchPresets}
                                        />
                                    })
                                }
                            </>
                        )
                    }
                </ul>
                <ul
                    // className={clsx(classes.filterSelectorContainer, { [classes.filterSelectorContainerActive]: typeof isCustomizeFilterOpen === 'number' })}
                    className={clsx
                        (
                            "max-h-[40vh] px-3.5 pb-2 overflow-x-hidden overflow-y-scroll absolute bg-disabled min-w-[300px]",
                            {
                                ["hidden"]: typeof isCustomizeFilterOpen !== 'number',
                                ["visible flex flex-col items-start justify-start text-200 text-sm z-10 cursor-pointer"]: typeof isCustomizeFilterOpen === 'number'
                            }
                        )
                    }
                    style={{
                        top: (typeof isCustomizeFilterOpen === 'number')
                            ?
                            (`${(40 + isCustomizeFilterOpen * 38)}px`)
                            :
                            '0px'
                    }}
                    ref={wrapperFilterRef}
                >
                    {
                        fields && nestedProperty.get(fields, (system ? 'directus_' : '') + collection) && typeof isCustomizeFilterOpen === 'number' && (
                            <>
                                {
                                    Object.entries(nestedProperty.get(fields, (system ? 'directus_' : '') + collection)).map(([key, value], index) => {
                                        return <FilterOption
                                            currentUser={currentUser}
                                            filters={filters}
                                            options={options}
                                            setOptions={setOptions}
                                            key={index}
                                            fields={fields}
                                            field={value}
                                            depth={0}
                                            route={collection}
                                            currentPreset={currentPreset}
                                            setIsCustomizeFilterOpen={setIsCustomizeFilterOpen}
                                            replaceIndex={isCustomizeFilterOpen}
                                            refetchPresets={refetchPresets}
                                        />
                                    })
                                }
                            </>
                        )
                    }
                </ul>
                <ul
                    // className={clsx(classes.filterSelectorContainer, { [classes.filterSelectorContainerActive]: typeof isCustomizeTypeOpen === 'number' })}
                    className={clsx
                        (
                            "max-h-[40vh] rounded-md mt-1 px-3.5 pb-2 overflow-x-hidden overflow-y-auto absolute bg-disabled min-w-[300px]",
                            {
                                ["hidden"]: typeof isCustomizeTypeOpen !== 'number',
                                ["visible flex flex-col items-start justify-start text-200 text-sm z-10 cursor-pointer"]: typeof isCustomizeTypeOpen === 'number'
                            }
                        )
                    }
                    style={{
                        top: (typeof isCustomizeTypeOpen === 'number')
                            ?
                            (`${(40 + isCustomizeTypeOpen * 38)}px`)
                            :
                            '0px'
                    }}
                    ref={wrapperTypeRef}
                >
                    {
                        (filterTypes as FilterTypeProps[]).map((filterType: FilterTypeProps, index: number) => {
                            return (
                                <FilterType
                                    key={index}
                                    filterType={filterType}
                                    filterTypes={filterTypes as FilterTypeProps[]}
                                    isTypeOpen={isCustomizeTypeOpen}
                                    filters={filters}
                                    fields={fields}
                                    currentPreset={currentPreset}
                                />
                            )
                        })
                    }
                </ul>
            </div>}
        </div >
    )
}

export default ResearchAndFilterBar