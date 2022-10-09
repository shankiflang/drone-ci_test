import { Directus_Presets, useGetAllFieldsInCollectionQuery, useUpdatePresetByIdMutation } from 'graphql/generated/hooks'
import React from 'react'
import omitDeep from 'omit-deep-lodash'
import GridCard from './components/GridCard'
import { MdOutlineCheckCircleOutline, MdViewComfy, MdViewModule, MdViewColumn, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md/index'
import { IoMdCloseCircleOutline } from 'react-icons/io/index'
import Popover from '../../Popover'
import { useResponsive } from 'components/hooks/useResponsive'

interface Props {
    records: Array<any>,
    mode: string,
    preset?: Directus_Presets,
    selected: Array<string>,
    setSelected: any,
    currentSelectedIds?: Array<string>,
    collection: string,
    options: any,
    setOptions: any,
    refetchPresets: any,
    system?: Boolean,
    gridProperties: any,
    defaultUrl?: string,
}


const cardSizes = [
    {
        key: 'sm',
        size: 120,
    },
    {
        key: 'md',
        size: 160,
    },
    {
        key: 'lg',
        size: 200,
    },
]


const ContentGrid = ({ records, mode, preset, selected, setSelected, collection, options, setOptions, refetchPresets, system, gridProperties, defaultUrl }: Props) => {
    const screen = useResponsive();
    const [cardSize, setCardSize] = React.useState<any>(
        preset?.layout_options?.cards?.size
            ?
            cardSizes.find((cardSize) => cardSize.size === preset?.layout_options?.cards?.size)
            :
            cardSizes[1]
    )

    const { data: { fields_in_collection: collectionFields } = {} } = useGetAllFieldsInCollectionQuery({ variables: { collection: (system ? 'directus_' : '') + collection } })
    const [updatePreset, { loading: updateCardSizeLoading }] = useUpdatePresetByIdMutation()

    const handleChangeCardSize = async () => {
        if (preset?.id && !updateCardSizeLoading) {
            let newPreset = omitDeep({
                ...preset,
                layout_options: {
                    ...preset.layout_options,
                    cards: {
                        size: (cardSize.size) === 200 ? 120 : cardSize.size + 40,
                    }
                }
            }, ['__typename'])

            updatePreset({
                variables: {
                    id: preset.id,
                    data: {
                        ...newPreset
                    }
                },
                onCompleted: (data) => {
                    if (data?.update_presets_item?.layout_options?.cards?.size) {
                        setCardSize(cardSizes.find((cardSize) => cardSize.size === data?.update_presets_item?.layout_options?.cards?.size))
                    }
                }
            })
        }
    }

    const toggleSelected = (i: number) => {
        let id = records[i]?.id.toString()
        if (mode.includes('single')) {
            if (selected.length && selected[0] === id) {
                return setSelected([])
            } else {
                return setSelected([id])
            }
        }

        if (selected.includes(id)) {
            let newSelected = [...selected]
            newSelected.splice(newSelected.indexOf(id), 1)
            setSelected(newSelected)
        } else {
            let newSelected = [...selected, id]
            setSelected(newSelected)
        }
    }

    const handleToggleAll = () => {
        if (records.length === selected.length) {
            setSelected([])
        } else {
            if (mode.includes('single')) {
                setSelected([])
            } else {
                setSelected([...records.map((record) => (record.id))])
            }
        }
    }

    const [anchorElAddOrder, setAnchorElAddOrder] = React.useState<null | HTMLElement>(null)
    const openAddOrder = Boolean(anchorElAddOrder)

    const handleOpenAddOrder = (event: any) => {
        setAnchorElAddOrder(event.currentTarget);
    }

    const handleCloseAddOrder = () => {
        setAnchorElAddOrder(null)
    }

    const handleToggleOrder = () => {
        if (preset && preset.id) {
            let currentOrder = (options.sort && options.sort[0]) ? options.sort[0] : '-'
            let targetOrder = currentOrder
            if (currentOrder.includes('-')) {
                if (currentOrder === '-') {
                    currentOrder = '-id'
                }
                targetOrder = currentOrder.replace('-', '')
                setOptions({ ...options, sort: [targetOrder] })
            } else {
                targetOrder = '-' + currentOrder
                setOptions({ ...options, sort: [targetOrder] })
            }
            updatePreset(
                {
                    variables: {
                        id: preset.id,
                        data: {
                            layout_query: {
                                tabular: {
                                    ...preset.layout_query.tabular,
                                    sort: [targetOrder]
                                }
                            }
                        }
                    }
                }
            )
        }
    }

    const handleChangeFieldOrder = (column: string | undefined | null) => {
        if (preset && preset.id) {
            let currentOrder = (options.sort && !options.sort[0].includes('-')) ? '' : '-'
            let targetOrder = currentOrder + (column ?? 'id')
            setOptions({ ...options, sort: [targetOrder] })
            updatePreset(
                {
                    variables: {
                        id: preset.id,
                        data: {
                            layout_query: {
                                tabular: {
                                    ...preset.layout_query.tabular,
                                    sort: [targetOrder]
                                }
                            }
                        }
                    }
                }
            )
            handleCloseAddOrder()
        }
    }

    return (
        <div className="w-full p-3 sm:px-8 pt-0 mt-3 sm:mt-0">
            <Popover
                open={openAddOrder}
                onClose={handleCloseAddOrder}
                classNamePop="bg-disabled z-20 rounded-md py-1 top-10 right-0"
                content={
                    <ul className="max-h-[25vh] py-0 px-1 overflow-x-hidden overflow-y-auto">
                        {
                            preset && collectionFields?.map((field) => (field)).filter(
                                (item) =>
                                    item?.field &&
                                    item?.type &&
                                    !['sort'].includes(item.field as string) &&
                                    ['uuid', 'text', 'string', 'number', 'timestamp'].includes(item.type as string)
                            ).map(
                                (column, index) => (
                                    <li
                                        className="relative flex items-center min-w-[220px] min-h-[32px] my-0.5 mx-0 py-0 px-3 overflow-hidden text-200 text-sm capitalize rounded cursor-pointer user-select-none hover:bg-dark transition-all"
                                        key={index}
                                        onClick={() => handleChangeFieldOrder(column?.field)}
                                    >
                                        <p>{column?.field?.split('_').join(' ')}</p>
                                    </li>
                                ))
                        }
                    </ul>
                }
            >
            </Popover>
            <div className="w-full h-[52px] mb-9 py-0 px-0 sm:px-2 border-y-2 border-solid border-l-main dark:border-d-dark flex items-center justify-between">
                <div>
                    {
                        selected.length === 0 && !mode.includes('single') && (
                            <button
                                aria-label="toggle-all"
                                className="flex items-center text-500 hover:text-300 transition-all"
                                onClick={() => handleToggleAll()}>
                                <MdOutlineCheckCircleOutline
                                    className="text-2xl"
                                />
                                <p className="ml-1 text-base pr-2 truncate max-w-[25vw] sm:max-w-none">
                                    Tout sélectionner
                                </p>
                            </button>
                        )
                    }
                    {
                        selected.length === 0 && mode.includes('single') && (
                            <button className="flex items-center text-500 hover:text-300 transition-all" aria-label="toggle-all">
                                <MdOutlineCheckCircleOutline
                                    className="text-2xl"
                                />
                                <p className="ml-1 text-base pr-2 truncate max-w-[25vw] sm:max-w-none">
                                    0 sélectionnés
                                </p>
                            </button>
                        )
                    }
                    {
                        selected.length > 0 && (
                            <button
                                className="flex items-center text-300"
                                onClick={() => handleToggleAll()}
                                aria-label="toggle-all"
                            >
                                <IoMdCloseCircleOutline
                                    className="text-2xl"
                                />
                                <p className="ml-1 text-base pr-2 truncate max-w-[25vw] sm:max-w-none">
                                    {selected.length} sélectionné{selected.length > 1 ? 's' : ''}
                                </p>
                            </button>
                        )
                    }
                </div>
                <div className="flex items-center text-500">
                    {
                        cardSize.key === 'sm' && (
                            <MdViewComfy
                                className="text-2xl mr-4 hover:text-300 transition-all cursor-pointer"
                                onClick={() => handleChangeCardSize()}
                            />
                        )
                    }
                    {
                        cardSize.key === 'md'  && (
                            <MdViewModule
                                className="text-2xl mr-4 hover:text-300 transition-all cursor-pointer"
                                onClick={() => handleChangeCardSize()}
                            />
                        )
                    }
                    {
                        cardSize.key === 'lg' && (
                            <MdViewColumn
                                className="text-2xl mr-4 hover:text-300 transition-all cursor-pointer"
                                onClick={() => handleChangeCardSize()}
                            />
                        )
                    }
                    <div className="flex items-center flex-grow">
                        {
                            options && !options.sort && (
                                <p onClick={(e) => handleOpenAddOrder(e)}>
                                    Id
                                </p>
                            )
                        }
                        {
                            options && options.sort && (
                                <p
                                    className="capitalize hover:text-300 transition-all cursor-pointer truncate max-w-[25vw]"
                                    onClick={(e) => handleOpenAddOrder(e)}>
                                    {options.sort[0].includes('-') ? options.sort[0].split('_').join(' ').substring(1) : options.sort[0].split('_').join(' ')}
                                </p>
                            )
                        }
                        {
                            options && options?.sort && options.sort[0] && !options.sort[0].includes('+') && !options.sort[0].includes('-') && (
                                <MdKeyboardArrowDown
                                    className="text-2xl hover:text-300 transition-all cursor-pointer"
                                    onClick={() => handleToggleOrder()}
                                />
                            )
                        }
                        {
                            ((options && options?.sort && options.sort[0] && options.sort[0].includes('-')) || (!options?.sort?.length)) && (
                                <MdKeyboardArrowUp
                                    className="text-2xl hover:text-300 transition-all cursor-pointer"
                                    onClick={() => handleToggleOrder()}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-wrap gap-y-8 gap-x-6 select-none">
                {
                    records.map((record, index) => {
                        return (
                            <GridCard collection={collection} record={record} gridProperties={gridProperties} key={index} index={index} toggleSelected={toggleSelected} selected={selected} cardSize={cardSize} mode={mode} defaultUrl={defaultUrl} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ContentGrid