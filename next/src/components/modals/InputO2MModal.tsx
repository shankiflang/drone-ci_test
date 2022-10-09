import React from 'react'
import { IoMdClose } from 'react-icons/io/index'
import CollectionManager from 'components/ui/global/ContentManager'


interface Props {
    handleClose?: () => void
    handleUpdateParent: (id: any) => void
    collection?: string
    currentSelectedIds: Array<string>
}


const O2MInputModal = ({ handleClose, handleUpdateParent, collection, currentSelectedIds }: Props) => {
	const handleSelectRecord = (records: any) => {
		handleUpdateParent(records)
		return handleClose ? handleClose() : null
	}

    return (
        <div className="h-screen max-w-full flex justify-start items-start flex-col">
            {
                collection && (
                    <CollectionManager
                        collection={collection}
                        mode='pick-multiple'
                        type='table'
                        handleSave={handleSelectRecord}
                        currentSelectedIds={currentSelectedIds}
                        closeModal={handleClose}
                    />
                )
            }
        </div>
    )
}


export default O2MInputModal