import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import Button from 'components/ui/buttons/Button'
import { useDropzone } from 'react-dropzone'
import { useCurrentUser } from 'components/providers/UserProvider'
import { directusFileUpload } from 'lib/files'
import { AiOutlineDelete } from 'react-icons/ai'
import Image from 'next/image'


interface Props {
    handleClose: () => void
    handleUpdateFile?: (record: any) => void
    refreshAllData?: () => void
    replaceFileAction?: any
    replaceFileId?: any
    replaceFileRefetch?: any
    fileLimit?: number
    type?: string
}



const UploadFileForm = ({
    handleClose,
    handleUpdateFile,
    refreshAllData,
    replaceFileAction,
    replaceFileId,
    replaceFileRefetch,
    fileLimit,
    type,
}: Props) => {
    const { user } = useCurrentUser()

    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = React.useState(false)

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: fileLimit ?? 1,
        accept: type === 'image' ? { 'image/*': [] } : undefined,
        onDrop: (acceptedFiles: any[]) => {
            let limit = fileLimit ?? 1

            if (acceptedFiles.length === 0) {
                if (type === 'image') {
                    toast.error(limit === 1 ? 'Vous ne pouvez pas importer plusieurs images.' : 'Vous ne pouvez pas importer plus de ' + limit + ' images.')
                } else {
                    toast.error(limit === 1 ? 'Vous ne pouvez pas importer plusieurs fichiers.' : `Vous ne pouvez pas importer plus de ${limit} fichiers.`)
                }
                return
            }

            if (acceptedFiles.length <= limit && files.length <= limit && acceptedFiles.length + files.length <= limit) {
                setFiles(
                    [...acceptedFiles, ...files].map(file => Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })));
            } else {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            }

        }
    });

    const removeFile = (index: number) => {
        setFiles(
            [...files].filter((file, i) => {
                if (i !== index) {
                    return Object.assign((file), {
                        preview: URL.createObjectURL(file)
                    });
                } else {
                    return false
                }
            })
        )
    }

    const thumbs = files.map((file: any, index: number) => {
        if (file && file?.preview && file?.name) {
            return (
                <div className="border-2 border-l-dark dark:border-d-main" style={{
                    display: 'inline-flex',
                    marginBottom: 8,
                    marginRight: 8,
                    width: 'auto',
                    height: '100px',
                    minWidth: '100px',
                    borderRadius: '6px',
                    padding: 4,
                    boxSizing: 'border-box'
                }} key={file.name}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        minWidth: 0,
                        position: 'relative'
                    }}>
                        {
                            file.type.includes('image') ? (
                                <>
                                    <img
                                        src={file.preview}
                                        style={{
                                            display: 'block',
                                            width: 'auto',
                                            height: '100%'
                                        }}
                                        // Revoke data uri after image is loaded
                                        alt="Preview Image"
                                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                    />
                                    <AiOutlineDelete
                                        onClick={() => removeFile(index)}
                                        className="transition-all absolute -top-3 -right-3 p-1 bg-main w-7 h-7 text-100 rounded-full cursor-pointer hover:bg-l-dark dark:hover:bg-d-light"
                                    />
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-row justify-center items-center">
                                    <p className="text-300 cursor-default text-xl">{file.name.substr(file.name.lastIndexOf('.') + 1)}</p>
                                    <AiOutlineDelete
                                        onClick={() => removeFile(index)}
                                        className="transition-all absolute -top-3 -right-3 p-1 bg-main w-7 h-7 text-100 rounded-full cursor-pointer hover:bg-l-dark dark:hover:bg-d-light"
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        } else {
            return null
        }
    })

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file: any) => URL.revokeObjectURL(file?.preview));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Formik
            initialValues={{}}
            onSubmit={async () => {
                setLoading(true)
                if (replaceFileAction && replaceFileId && files[0]) {
                    replaceFileAction({ id: replaceFileId, file: files[0] }).then(async (res: any) => {
                        await replaceFileRefetch()
                        if (type === 'image') {
                            if (fileLimit === 1) {
                                toast.success("L'image a bien été importé.")
                            } else if (files.length > 1) {
                                toast.success(`${files.length} images ont bien été importées.`)
                            }
                        } else {
                            if (fileLimit === 1) {
                                toast.success("Le fichier a bien été importé.")
                            } else if (files.length > 1) {
                                toast.success(`${files.length} fichiers ont bien été importés.`)
                            }
                        }
                        setLoading(false)
                        handleClose()
                    })
                } else if (files.length > 0) {
                    let { data: newFile } = await directusFileUpload({
                        file: files,
                        data: files.map((file) => {
                            return {
                                title: file.name,
                                uploaded_by: user?.id,
                            }
                        })
                    })

                    if (!Array.isArray(newFile.data) && newFile?.data?.id && newFile?.data?.title) {
                        if (handleUpdateFile) {
                            handleUpdateFile(newFile.data)
                        }
                        if (refreshAllData) {
                            refreshAllData()
                        }
                        if (type === 'image') {
                            toast.success("L'image a bien été importé.")
                        } else {
                            toast.success("Le fichier a bien été importé.")
                        }
                    } else if (Array.isArray(newFile.data) && newFile?.data[0]?.id) {
                        if (handleUpdateFile) {
                            handleUpdateFile(newFile.data)
                        }
                        if (refreshAllData) {
                            refreshAllData()
                        }
                        if (type === 'image') {
                            toast.success("Les images ont bien été importées.")
                        } else {
                            toast.success("Les fichiers ont bien été importés.")
                        }
                    } else {
                        if (type === 'image') {
                            toast.error("Une erreur est survenue lors de l'import de l'image.")
                        } else {
                            toast.error("Il y a eu problème lors de l'importation du fichier.")
                        }
                    }
                    setLoading(false)
                    handleClose()
                } else {
                    setLoading(false)
                    return handleClose()
                }
            }}
        >
            {(formikProps) => (
                <form
                    className="w-full flex justify-start items-start flex-col flex-wrap mt-1"
                    onSubmit={formikProps.handleSubmit}
                >
                    <section className="w-full flex flex-col justify-start items-start mt-2">
                        <div {...getRootProps({ className: 'dropzone w-full' })}>
                            <input {...getInputProps()} />
                            <div className="cursor-pointer transition-all group w-full h-24 border-dashed border-[3px] p-2 flex flex-row justify-center items-center rounded-lg border-l-dark dark:border-d-light hover:border-l-primary-main hover:dark:border-d-primary-main">
                                <p className="transition-all text-400 group-hover:text-l-primary-main dark:group-hover:text-d-primary-main">{type === 'image' ? "Déposer vos images ici" : "Déposer vos fichiers ici"}</p>
                            </div>
                        </div>
                        <aside style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 16
                        }}>
                            {thumbs}
                        </aside>
                    </section>
                    <div className="mt-2 w-full flex flex-row justify-between items-start">
                        <Button
                            name="Annuler"
                            className="mr-2"
                            disabled={loading}
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Annuler
                        </Button>
                        <Button
                            className="ml-2"
                            submit={true}
                            disabled={loading}
                            variant="primary"
                            name="Importer"
                        >
                            Importer
                        </Button>
                    </div>
                </form>
            )}
        </Formik >
    )
}


export default UploadFileForm