import React from 'react'
import { IoMdClose } from 'react-icons/io/index'
import CollectionManager from 'components/ui/global/ContentManager'


interface Props {
    handleClose?: () => void
    handleUpdateParent: (id: any) => void
    collection: string
    currentSelectedIds: Array<string>
    system: boolean
    forceFields?: string | null
    title?: string
    Icon?: any
    type?: string
    gridProperties?: any
    defaultOrderValue?: string
    defaultFilter?: Array<any>
}


const InputSelectM2OModal = ({
    handleClose,
    handleUpdateParent,
    collection,
    currentSelectedIds,
    system,
    forceFields,
    title,
    Icon,
    type,
    gridProperties,
    defaultOrderValue,
    defaultFilter,
}: Props) => {
	const handleSelectRecord = (record: any) => {
		handleUpdateParent(record[0])
		return handleClose ? handleClose() : null
	}

    return (
        <div className="h-screen max-w-full flex justify-start items-start flex-col">
            {
                collection && (
                    <CollectionManager
                        collection={collection}
                        mode='pick-single'
                        type={type ? type : 'table'}
                        handleSave={handleSelectRecord}
                        currentSelectedIds={currentSelectedIds}
                        system={system ?? false}
                        forceFields={forceFields ?? undefined}
                        title={title ?? undefined}
                        Icon={Icon ?? undefined}
                        gridProperties={gridProperties ?? undefined}
                        defaultOrderValue={defaultOrderValue ?? undefined}
                        defaultFilter={defaultFilter ?? undefined}
                        closeModal={handleClose}
                    />
                )
            }
        </div>
    )
}


export default InputSelectM2OModal