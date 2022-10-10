import React from 'react'
import UploadFileForm from 'components/forms/UploadFileForm'


interface Props {
    handleUpdateFile?: any,
    fileLimit?: number,
    handleClose?: any
    type?: string
    props?: any
    replaceFileAction?: any,
    replaceFileRefetch?: any
    replaceFileId?: any
}


const FileUploader = ({ handleUpdateFile, fileLimit, handleClose, type, props, replaceFileAction, replaceFileRefetch, replaceFileId }: Props) => {
    return (
        <div className="max-w-full flex justify-start items-start flex-col p-8 bg-default rounded-lg">
            <p className="text-200">
            {type === 'image' ? "Importer une image depuis votre poste" : "Importer un fichier depuis votre poste"}
            </p>
            <UploadFileForm handleUpdateFile={handleUpdateFile} handleClose={handleClose} fileLimit={fileLimit} type={type} refreshAllData={props?.refreshAllData} replaceFileAction={replaceFileAction} replaceFileRefetch={replaceFileRefetch} replaceFileId={replaceFileId} />
        </div>
    )
}


export default FileUploader