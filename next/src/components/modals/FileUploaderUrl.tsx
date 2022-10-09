import { useCurrentUser } from 'components/providers/UserProvider'
import React from 'react'
import UploadFileUrlForm from 'components/forms/UploadFileUrlForm'


interface Props {
    handleUpdateFile: any,
    handleClose?: any
}


const FileUploaderUrl = ({ handleUpdateFile, handleClose }: Props) => {
    return (
        <div className="max-w-full flex justify-start items-start flex-col p-8 bg-default rounded-lg">
            <p className="text-200 mb-2">
                Importer un fichier depuis une URL
            </p>
            <UploadFileUrlForm handleUpdateFile={handleUpdateFile} handleClose={handleClose} />
        </div>
    )
}


export default FileUploaderUrl