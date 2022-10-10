import { Directus_Files, useUpdateFileMutation } from 'graphql/generated/hooks'
import { directusFileUpdate } from 'lib/files'
import moment from 'moment'
import React, { useEffect } from 'react'



interface useFileProps {
	file: Directus_Files | undefined | null
	// key?: string
}

export const useFile = ({ file }: useFileProps) => {
	const [updateFile, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateFileMutation()
	const [deleteFile, { data: deleteData, loading: deleteLoading, error: deleteError }] = useUpdateFileMutation()

	const [currentFile, setCurrentFile] = React.useState<Directus_Files | undefined>(undefined)

	useEffect(() => {
		if (file) {
			setCurrentFile(file)
		}
	}, [currentFile, file]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleGetDownloadURL = currentFile
		? process.env.NEXT_PUBLIC_BACKEND_URL + '/assets/' + currentFile.id + '?cachebust=' + moment.now() + '&download'
		: undefined

	const handleGetFileURL = currentFile
		? process.env.NEXT_PUBLIC_BACKEND_URL + '/assets/' + currentFile.id + '?cachebust=' + moment.now()
		: undefined

	return {
		updateFile: {
			loading: updateLoading,
			error: updateError,
			data: updateData,
			updateFile,
		},
		deleteFile: {
			loading: deleteLoading,
			error: deleteError,
			data: deleteData,
			deleteFile,
		},
		replaceFile: directusFileUpdate,
		fileURL: handleGetFileURL,
		downloadURL: handleGetDownloadURL,
	}
}

export default useFile