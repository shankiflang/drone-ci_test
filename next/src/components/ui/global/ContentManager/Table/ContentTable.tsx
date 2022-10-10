import React from 'react'
import clsx from 'clsx'
import { Directus_Presets, useDeletePresetByIdMutation, useGetAllFieldsInCollectionQuery, useUpdatePresetByIdMutation } from 'graphql/generated/hooks'
import { useResizeObserver, ExtendedTableState } from 'components/hooks/useResizeObserver'
import moment from 'moment'
import omitDeep from 'omit-deep-lodash'
import { useResizeColumns, useTable } from 'react-table'
import { GrFormAdd } from 'react-icons/gr/index'
import { MdArrowDownward, MdArrowUpward, MdArrowDropDown } from 'react-icons/md/index'
import { AiOutlineMinus } from 'react-icons/ai/index'
import { FaCheck } from 'react-icons/fa/index'
import Popover from '../../Popover'
import nestedProperty from 'nested-property'
import { useRouter } from 'next/router'
import { useModal } from 'components/providers/ModalProvider'
import { useTheme } from 'next-themes'
import RecordDetails from 'components/modals/RecordDetails'
import getValue from 'lib/utils/getValue'


moment.locale('fr')


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
    fields: any,
    defaultUrl?: string,
}


const blackListedOrders = ['json']


const ContentTable = ({ records, mode, preset, selected, setSelected, collection, options, setOptions, refetchPresets, system, fields, defaultUrl }: Props) => {
    const router = useRouter()
    const { handleModal } = useModal()
    const { theme } = useTheme()

    const [updatePreset] = useUpdatePresetByIdMutation()
    const [deletePreset] = useDeletePresetByIdMutation()
    const { data: { fields_in_collection: collectionFields } = {} } = useGetAllFieldsInCollectionQuery({ variables: { collection: (system ? 'directus_' : '') + collection } })

    const toggleSelected = (i: number, pass?: Boolean) => {
        if (mode.includes('view')) {
            return
        }

        if (mode.includes('edit') && !pass) {
            return
        }

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
            setSelected([...records.map((record) => (record.id))])
        }
    }

    const generateDataFromRecords = (records: Array<any>) => {
        const blackListedFileds = ['id', '__typename']
        return records.map((record) => {
            let recordFiltered = {}
            Object.entries(record).forEach(([key, value]) => {
                if (!blackListedFileds.includes(key)) {
                    (recordFiltered as any)[key] = value
                }
            })
            return recordFiltered
        })
    }

    const generateColumnsFromData = (preset: Directus_Presets | undefined) => {
        if (preset) {
            if (!preset.layout_query.tabular.fields) {
                deletePreset({ variables: { id: (preset.id as string) } })
                return refetchPresets()
            }
            const columns = preset.layout_query.tabular.fields

            return columns.map((key: string) => {
                let width = 150
                if (preset?.layout_options?.tabular?.widths[key]) {
                    let tWidth = preset?.layout_options?.tabular?.widths[key]
                    if (tWidth > 500) {
                        width = 500
                    } else if (tWidth < 100) {
                        width = 100
                    } else {
                        width = tWidth
                    }
                } else {
                    width = 150
                }

                let matchingField = nestedProperty.get(fields, `${system ? 'directus_' : ''}${collection}.${key}`)[0]

                return {
                    Header: matchingField?.meta?.translations?.find((lang: any) => lang?.language === "fr-FR")?.translation ?? key.charAt(0).toUpperCase() + key.slice(1),
                    field: matchingField,
                    accessor: key,
                    width,
                    minWidth: 100,
                    maxWidth: 500,
                }
            })
        }
    }


    const tableData = React.useMemo(
        () => generateDataFromRecords(records), [records]
    )

    const columsData = React.useMemo(
        () => generateColumnsFromData(preset), [preset] // eslint-disable-line react-hooks/exhaustive-deps
    )


    // get table data
    // @ts-ignore
    const tableInstance = useTable({ columns: columsData, data: tableData }, useResizeColumns)
    const {
        state,
        headerGroups,
        rows,
        getTableBodyProps,
        prepareRow,
    } = tableInstance


    useResizeObserver(state as ExtendedTableState, (columndId, columnSize) => {
        if (preset) {
            let newData = {
                ...preset,
                layout_options: {
                    tabular: {
                        widths: {
                            ...preset?.layout_options?.tabular?.widths,
                            [columndId]: columnSize ?? 150,
                        }
                    }
                }
            }

            updatePreset(
                {
                    variables: {
                        id: preset.id!,
                        data: omitDeep(newData, '__typename')
                    }
                }
            )
        }
    })

    const [openOptions, setOpenOptions] = React.useState<Boolean | number>(false)

    const handleOrderBy = (orderBy: string) => {
        if (typeof openOptions === 'number' && preset && preset.id) {
            // @ts-ignore
            let id = parseInt(openOptions)

            let targetFilter = ''
            if (orderBy === 'asc') {
                targetFilter = preset.layout_query.tabular.fields[id]
            } else {
                targetFilter = '-' + preset.layout_query.tabular.fields[id]
            }
            setOptions({
                ...options,
                sort: [targetFilter]
            })
            updatePreset(
                {
                    variables: {
                        id: preset.id,
                        data: {
                            layout_query: {
                                tabular: {
                                    ...preset.layout_query.tabular,
                                    sort: [targetFilter]
                                }
                            }
                        }
                    }
                }
            )
            refetchPresets()
            return setOpenOptions(false)
        }
    }

    const [openAddColumn, setOpenAddColumn] = React.useState(false)

    const handleAddColumn = (column: string) => {
        if (preset && column) {
            updatePreset(
                {
                    variables: {
                        id: (preset.id as string),
                        data: {
                            layout_options: {
                                tabular: {
                                    widths: {
                                        ...preset.layout_options.tabular.widths,
                                        [`${column}`]: 150
                                    }
                                }
                            },
                            layout_query: {
                                tabular: {
                                    ...preset.layout_query.tabular,
                                    fields: [...preset.layout_query.tabular.fields, column]
                                }
                            }
                        }
                    }
                }
            )
            refetchPresets()
            return setOpenAddColumn(false)
        }
    }

    const handleRemoveColumn = () => {
        // @ts-ignore
        if (preset && typeof openOptions === 'number' && preset.layout_query.tabular.fields[parseInt(openOptions)].length > 1) {
            updatePreset(
                {
                    variables: {
                        id: (preset.id as string),
                        data: {
                            layout_options: {
                                tabular: {
                                    widths: {
                                        ...Object.keys(preset.layout_options.tabular.widths)
                                            // @ts-ignore
                                            .filter((w: string) => w !== preset.layout_query.tabular.fields[parseInt(openOptions)])
                                            .reduce((obj: any, key: string) => {
                                                obj[key] = preset.layout_options.tabular.widths[key]
                                                return obj;
                                            }, {}),
                                    }
                                }
                            },
                            layout_query: {
                                tabular: {
                                    ...preset.layout_query.tabular,
                                    fields: [
                                        ...preset.layout_query.tabular.fields
                                            // @ts-ignore
                                            .filter((w: string) => w !== preset.layout_query.tabular.fields[parseInt(openOptions)])
                                    ]
                                }
                            }
                        }
                    }
                }
            )
            refetchPresets()
            return setOpenOptions(false)
        }
    }

    return (
        <div className='text-sm mb-12'>
            <div className="mx-3 sm:mx-8">
                <table
                    aria-labelledby="tableTitle"
                >
                    <thead>
                        <tr className={"relative h-12 border-b-2 border-solid border-l-main dark:border-d-border-dark"}>
                            {
                                !mode.includes('view') && (
                                    <th
                                        className={clsx('h-12 py-0 pl-5 pr-2 flex justify-center items-center')}
                                    >
                                        {
                                            (mode.includes('edit') || mode.includes('multiple')) && (
                                                <button
                                                    type="button"
                                                    role="checkbox"
                                                    aria-label="checkbox"
                                                    data-checked={selected.length === records.length}
                                                    aria-checked={selected.length === records.length}
                                                    data-indeterminate={selected.length > 0 && selected.length < records.length}
                                                    className={
                                                        `relative transition-all w-5 h-5 cursor-pointer border-2 border-l-border-dark dark:border-d-border-light rounded-sm hover:border-l-secondary-main dark:hover:border-d-primary-main
                                                        ${(selected.length === records.length) ? ' border-l-secondary-main dark:border-d-primary-main' : ''}
                                                        `
                                                    }
                                                    onClick={handleToggleAll}
                                                >
                                                    {
                                                        (selected.length === records.length) && (
                                                            <FaCheck className="absolute top-[1px] left-[1px] text-l-secondary-main dark:text-d-primary-main font-bold w-3.5 h-3.5" />
                                                        )
                                                    }
                                                </button>
                                            )
                                        }
                                    </th>
                                )
                            }
                            {headerGroups.map((headerGroup: any, i: number) => {
                                return (
                                    <React.Fragment key={i}>
                                        {headerGroup.headers.map((column: any, index: number) => {
                                            column.Header = (column?.Header as string).split('_').join(' ')

                                            let isOrderBlacklisted = blackListedOrders.includes(column.field.type)

                                            return (
                                                <th
                                                    key={index}
                                                    id={index + '-header-cell-id'}
                                                    className="relative h-[50px] px-4 font-medium select-none group ease-in duration-200 cursor-pointer"
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        width: column.width,
                                                        maxWidth: column.maxWidth,
                                                    }}
                                                >
                                                    <Popover
                                                        onClick={() => {
                                                            if (openOptions === false) {
                                                                return setOpenOptions(index)
                                                            }
                                                            return null
                                                        }}
                                                        open={openOptions === index}
                                                        onClose={() => setOpenOptions(false)}
                                                        className="flex justify-between items-center h-full"
                                                        classNamePop="cursor-default"
                                                        content={
                                                            <div className="bg-disabled absolute w-56 z-20 rounded-md mt-4 py-1">
                                                                <div
                                                                    className={`w-[calc(100% - 8px)] flex justify-start items-center p-1 m-1 ${isOrderBlacklisted ? "cursor-not-allowed" : "cursor-pointer rounded-md hover:bg-main ease-in-out duration-300"}`}
                                                                    onClick={() => !isOrderBlacklisted ? handleOrderBy('asc') : null}
                                                                >
                                                                    <MdArrowDownward className={`w-6 h-6 mx-1 ${isOrderBlacklisted ? 'text-600' : 'text-300'}`} />
                                                                    <p className={`w-full flex justify-start items-start px-1 rounded-md my-1 ${isOrderBlacklisted ? "text-600" : "text-300"}`}>Croissant</p>
                                                                </div>
                                                                <div
                                                                    className={`w-[calc(100% - 8px)] flex justify-start items-center p-1 m-1 ${isOrderBlacklisted ? "cursor-not-allowed" : "cursor-pointer rounded-md hover:bg-main ease-in-out duration-300"}`}
                                                                    onClick={() => !isOrderBlacklisted ? handleOrderBy('desc') : null}
                                                                >
                                                                    <MdArrowUpward className={`w-6 h-6 mx-1 ${isOrderBlacklisted ? 'text-600' : 'text-300'}`} />
                                                                    <p className={`w-full flex justify-start items-start px-1 rounded-md my-1 ${isOrderBlacklisted ? "text-600" : "text-300"}`}>Décroissant</p>
                                                                </div>
                                                                <hr className="mx-3 border border-l-main dark:border-d-main my-2" />
                                                                <div
                                                                    className={`w-[calc(100% - 8px)] flex justify-start items-center p-1 m-1 ${Object.keys(preset?.layout_options?.tabular?.widths).length <= 1 ? "cursor-not-allowed" : "cursor-pointer rounded-md hover:bg-main ease-in-out duration-300"}`}
                                                                    onClick={() => Object.keys(preset?.layout_options?.tabular?.widths).length <= 1 ? {} : handleRemoveColumn()}
                                                                >
                                                                    <AiOutlineMinus className={`w-6 h-6 mx-1 ${Object.keys(preset?.layout_options?.tabular?.widths).length <= 1 ? 'text-600' : 'text-300'}`} />
                                                                    <p className={`w-full flex justify-start items-start px-1 rounded-md my-1 ${Object.keys(preset?.layout_options?.tabular?.widths).length <= 1 ? "text-600" : "text-300"}`}>Cacher la colonne</p>
                                                                </div>
                                                            </div>
                                                        }
                                                    >
                                                        {/* <div className="flex justify-between items-start capitalize"> */}
                                                        <p
                                                            className={clsx(
                                                                'whitespace-nowrap text-left text-sm text-200 font-normal overflow-hidden text-ellipsis w-fit',
                                                            )}
                                                        >
                                                            {column.render('Header')}
                                                        </p>
                                                        {
                                                            preset &&
                                                            options &&
                                                            options.sort &&
                                                            options.sort.includes(preset.layout_query.tabular.fields[index]) && (
                                                                <MdArrowDownward className="w-5 h-5 text-400" />
                                                            )
                                                        }
                                                        {
                                                            preset &&
                                                            options &&
                                                            options.sort &&
                                                            options.sort.includes('-' + preset.layout_query.tabular.fields[index]) && (
                                                                <MdArrowUpward className="w-5 h-5 text-400" />
                                                            )
                                                        }
                                                        {
                                                            preset &&
                                                            options &&
                                                            options.sort &&
                                                            !options.sort.includes(preset.layout_query.tabular.fields[index]) &&
                                                            !options.sort.includes('-' + preset.layout_query.tabular.fields[index]) && (
                                                                <MdArrowDropDown className="ml-3 w-5 h-5 cursor-pointer text-d-400 opacity-0 group-hover:opacity-100" />
                                                            )
                                                        }
                                                        {/* </div> */}
                                                    </Popover>
                                                    <span
                                                        {...column.getResizerProps()}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className={
                                                            clsx(
                                                                `absolute top-[20%] right-[3px] w-0.5 h-3/5 transition-opacity separator hover:bg-l-secondary-main ${theme === 'dark' ? 'bg-d-dark' : 'bg-l-main'}`,
                                                            )
                                                        }
                                                        style={{
                                                            cursor: 'ew-resize',
                                                        }}
                                                    ></span>
                                                </th>
                                            )
                                        })}
                                        <th className="relative h-12 py-0 px-3 border-b-2 border-solid border-l-main dark:border-d-border-dark text-600 group ease-in-out duration-300 w-full">
                                            <Popover
                                                open={openAddColumn}
                                                content={
                                                    <div className="bg-disabled absolute w-56 z-20 rounded-md">
                                                        {preset &&
                                                            collectionFields
                                                                ?.map((field) => field?.field)
                                                                .filter(
                                                                    (item) =>
                                                                        !preset.layout_query.tabular.fields.includes(item as string) && !['id', 'sort'].includes(item as string)
                                                                )
                                                                .map((column, index) => (
                                                                    <div
                                                                        className="w-[calc(100% - 8px)] flex justify-start items-start p-1 mx-1 cursor-pointer rounded-md my-2 hover:bg-main ease-in-out duration-300"
                                                                        key={index}
                                                                        onClick={() => handleAddColumn(column as string)}
                                                                    >
                                                                        <p className="capitalize w-full flex justify-start items-start px-1 cursor-pointer rounded-md my-1 text-200 font-normal">
                                                                            {column?.split('_').join(' ')}
                                                                        </p>
                                                                    </div>
                                                                ))
                                                        }
                                                    </div>
                                                }
                                                onClose={() => setOpenAddColumn(false)}
                                            >
                                                <GrFormAdd className="cursor-pointer w-6 h-6 svg-stroke group-hover:text-100 ease-in-out duration-300" onClick={() => setOpenAddColumn(true)} />
                                            </Popover>
                                        </th>
                                    </React.Fragment>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row: any, i: number) => {
                            prepareRow(row)

                            return (
                                <tr
                                    className={`transition-all relative h-[50px] border-b-2 border-solid border-l-main dark:border-d-border-dark cursor-pointer select-none hover:bg-disabled ${selected.includes(records[i]?.id?.toString()) ? "bg-disabled" : ""}`}
                                    onClick={() => toggleSelected(i, selected.length > 0)}
                                    key={i}
                                >
                                    {
                                        !mode.includes('view') && (
                                            <td className={clsx('h-12 py-0 pl-5 pr-2 flex justify-center items-center')}>
                                                {
                                                    (mode.includes('edit') || mode.includes('multiple')) && (
                                                        <button
                                                            type="button"
                                                            role="checkbox"
                                                            aria-label="checkbox"
                                                            data-checked={selected.length === records.length}
                                                            aria-checked={selected.length === records.length}
                                                            data-indeterminate={selected.length > 0 && selected.length < records.length}
                                                            className={
                                                                `relative transition-all w-5 h-5 cursor-pointer border-2 border-l-border-dark dark:border-d-border-light rounded-sm hover:border-l-secondary-main dark:hover:border-d-primary-main
                                                            ${selected.includes(records[i]?.id?.toString()) ? 'border-l-secondary-main dark:border-d-primary-main' : ''}
                                                            `
                                                            }
                                                            onClick={() => toggleSelected(i, true)}
                                                        >
                                                            {selected.includes(records[i]?.id?.toString()) && (
                                                                <FaCheck className="absolute top-[1px] left-[1px] text-l-secondary-main dark:text-d-primary-main font-bold w-3.5 h-3.5" />
                                                            )}
                                                        </button>
                                                    )
                                                }
                                                {
                                                    (mode.includes('single')) && (
                                                        <button
                                                            type="button"
                                                            role="radio"
                                                            aria-label="radio"
                                                            data-checked={selected.length === records.length}
                                                            aria-checked={selected.length === records.length}
                                                            data-indeterminate={selected.length > 0 && selected.length < records.length}
                                                            className={
                                                                `overflow-hidden relative rounded-full transition-all w-5 h-5 cursor-pointer border-2 border-l-border-dark dark:border-d-border-light hover:border-l-primary-main dark:hover:border-d-primary-main
                                                            ${selected.includes(records[i]?.id?.toString()) ? 'border-l-primary-main dark:border-d-primary-main' : ''}
                                                            `
                                                            }
                                                            onClick={() => toggleSelected(i, true)}
                                                        >
                                                            {selected.includes(records[i]?.id?.toString()) && (
                                                                <div className="absolute bg-l-primary-main dark:bg-d-primary-main w-3 h-3 m-1 rounded-full -top-0.5 -left-0.5" />
                                                            )}
                                                        </button>
                                                    )
                                                }
                                            </td>
                                        )
                                    }
                                    {
                                        row.cells.map((cell: any, index: number) => {
                                            let formattedCell = {
                                                ...cell,
                                                value: new DOMParser().parseFromString(getValue(cell.column.id, cell.value, (collectionFields as any[]) ?? []), 'text/html')?.body?.textContent ?? ''
                                            }

                                            // Apply the cell props
                                            return (
                                                <td className="py-0 px-3 overflow-hidden text-ellipsis whitespace-nowrap"
                                                    key={cell.column.id}
                                                    onClick={() => {
                                                        if (mode.includes('edit') && !selected.length) {
                                                            if (defaultUrl) {
                                                                router.push(defaultUrl + '/' + records[i]?.id.toString())
                                                            } else {
                                                                router.push(router.asPath + '/' + records[i]?.id.toString())
                                                            }
                                                        }

                                                        if (mode.includes('view')) {
                                                            handleModal(<RecordDetails recordId={records[i]?.id.toString()} collection={collection} system={system} />,
                                                            "bg-default top-0 right-0 absolute md:w-[80%]")
                                                        }
                                                    }}
                                                    // className={classes.cellContainer}
                                                    {...cell.getCellProps()}
                                                >
                                                    {
                                                        cell?.column?.id === 'action' && (
                                                            <div
                                                                style={{
                                                                    minWidth: cell.column.minWidth,
                                                                    width: cell.column.width,
                                                                    maxWidth: cell.column.maxWidth,
                                                                }}
                                                            >
                                                                <p
                                                                    className={
                                                                        `overflow-hidden text-ellipsis whitespace-nowrap ${cell.value === 'create' ?
                                                                            'bg-actions-create' : (cell.value === 'update' ?
                                                                                'bg-actions-update' : (cell.value === 'delete' ?
                                                                                    'bg-actions-delete' : (cell.value === 'login' ?
                                                                                        'bg-actions-login' : 'bg-actions-main'
                                                                                    )
                                                                                )
                                                                            )
                                                                        }`
                                                                    }
                                                                    style={{
                                                                        color: cell.value === 'create' ? '#8866ff' : (
                                                                            cell.value === 'update' ? '#3399ff' : (
                                                                                cell.value === 'delete' ? '#e35169' : (
                                                                                    cell.value === 'login' ? '#6644ff' : '#8866ff'
                                                                                )
                                                                            )
                                                                        ),
                                                                        margin: '4px',
                                                                        padding: '2px 6px',
                                                                        borderRadius: '6px',
                                                                        width: 'fit-content',
                                                                        textTransform: 'capitalize'
                                                                    }}
                                                                >
                                                                    {
                                                                        cell.value === 'create' ? 'Création' : (
                                                                            cell.value === 'update' ? 'Mise à jour' : (
                                                                                cell.value === 'delete' ? 'Suppression' : (
                                                                                    cell.value === 'login' ? 'Connexion' : (
                                                                                        cell.value === 'run' ? 'Programmes' : cell.value
                                                                                    )
                                                                                )
                                                                            )
                                                                        )
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        cell?.column?.id !== 'action' && (
                                                            <p
                                                                style={{
                                                                    minWidth: cell.column.minWidth,
                                                                    width: cell.column.width,
                                                                    maxWidth: cell.column.maxWidth,
                                                                }}
                                                                className="text-300 overflow-hidden text-ellipsis whitespace-nowrap"
                                                            >
                                                                {// Render the cell contents
                                                                    formattedCell.value
                                                                }
                                                            </p>
                                                        )
                                                    }
                                                </td>
                                            )
                                        })}
                                    <td />
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default ContentTable