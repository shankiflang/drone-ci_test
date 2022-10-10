import React from 'react'
import ContentManager from 'components/ui/global/ContentManager'
import formatBytes from 'lib/utils/formatBytes'
import { IoMdClose } from 'react-icons/io/index'

interface Props {
    handleUpdateParent: (id: any) => void,
    handleClose?: () => void,
    currentSelectedIds: Array<string>,
    title?: string,
    Icon?: any,
    defaultFilter?: Array<any>,
    multiple?: boolean,
    defaultFilterName?: string
    closeAction?: any
}

const FileUploaderGallery = ({
    handleUpdateParent,
    handleClose,
    currentSelectedIds,
    title,
    Icon,
    defaultFilter,
    multiple,
    defaultFilterName,
    closeAction
}: Props) => {
    let close = () => {
        closeAction ? closeAction() : null
        return handleClose ? handleClose() : null
    }

    const handleSelectRecord = (records: any) => {
        handleUpdateParent(records)
        return close()
    }

    return (
        <div className="h-screen max-w-full flex justify-start items-start flex-col">
            {
                (
                    <ContentManager
                        mode={multiple ? 'pick-multiple' : 'pick-single'}
                        collection={'files'}
                        type={'grid'}
                        handleSave={handleSelectRecord}
                        currentSelectedIds={currentSelectedIds}
                        system={true}
                        forceFields='title type modified_on filesize'
                        title={title ?? undefined}
                        gridProperties={{
                            title: '{{title}}',
                            subTitle: '{{filesize}}',
                            subTitleFormatter: formatBytes,
                        }}
                        defaultOrderValue={'-uploaded_on'}
                        defaultFilter={defaultFilter ?? undefined}
                        defaultFilterName={defaultFilterName ?? undefined}
                        closeModal={handleClose}
                    />
                )
            }
        </div>
    )

}

export default FileUploaderGallery