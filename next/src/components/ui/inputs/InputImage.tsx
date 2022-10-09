import React, { useEffect } from 'react'
import Input from './Input'
import Popover from 'components/ui/global/Popover'
import { AiOutlineUpload } from 'react-icons/ai/index'
import { MdDeleteOutline, MdOutlineImage, MdOutlineOpenInNew } from 'react-icons/md/index'
import { BsImages } from 'react-icons/bs/index'
import { useModal } from 'components/providers/ModalProvider'
import FileUploader from 'components/modals/FileUploader'
import { useDeleteFileMutation, useDeleteFilesMutation } from 'graphql/generated/hooks'
import { toast } from 'react-toastify'
import moment from 'moment'
import FileUploaderGallery from 'components/modals/FileUploaderGallery'
import ImagePreview from 'components/modals/ImagePreview'


interface Props {
    setFieldValue: any
    value: any
    name: string
    field?: string
    required?: boolean
    label?: string
    className?: string,
    fileLimit?: number,
    rawField?: any,
}




const InputImage = ({ setFieldValue, name, field, required, label, className, value, fileLimit, rawField }: Props) => {
    const [open, setOpen] = React.useState(false)
    const [source, setSource] = React.useState(false)
    const [imageName, setFileName] = React.useState<string>(rawField?.title ?? '') // image name from value

    const { handleModal } = useModal()

    const [deleteFileById] = useDeleteFileMutation()
    const [deleteFileByIds] = useDeleteFilesMutation()

    const handleUpdateFile = (record: any | any[]) => {
        setFieldValue(
            field,
            Array.isArray(record) ? (
                (fileLimit && fileLimit > 1) ? (
                    record.map((item: any) => ({
                        id: item.id,
                        storage: 'local',
                        filename_download: item.title ? item.title : moment.now(),
                        uploaded_on: new Date(),
                        modified_on: new Date(),
                        type: item.type,
                        title: item.title,
                    }))
                ) : (
                    record[0] ? (
                        {
                            id: record[0].id,
                            storage: 'local',
                            filename_download: record[0].title ? record[0].title : moment.now(),
                            uploaded_on: new Date(),
                            modified_on: new Date(),
                            type: record[0].type,
                            title: record[0].title,
                        }
                    ) : (
                        null
                    )
                )
            ) : (
                {
                    id: record.id,
                    storage: 'local',
                    filename_download: record.title ? record.title : moment.now(),
                    uploaded_on: new Date(),
                    modified_on: new Date(),
                    type: record.type,
                    title: record.title,
                }
            )
        )
        setFileName(
            Array.isArray(record) ? (
                (fileLimit && fileLimit > 1) ? (
                    (record.length) + " Images"
                ) : (
                    record[0]?.title ?
                        record[0].title : ''
                )
            ) : (record.title)
        )
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenModal = (modal: React.ReactNode) => {
        setOpen(false)
        handleModal(modal, "absolute w-fit h-fit flex justify-center items-center")
    }

    const handleDeleteFileIfExist = async () => {
        if (!value) {
            return
        }

        if (!source) {
            if (Array.isArray(value)) {
                await deleteFileByIds({
                    variables: {
                        ids: value.map((item: any) => item.id),
                    },
                    onCompleted: () => {
                        if (value.length > 1) {
                            toast.success('Les images ont été supprimés avec succès.')
                        } else {
                            toast.success('L\'image a été supprimée avec succès.')
                        }
                        setFieldValue(field, {})
                        setFileName('')
                    },
                    onError: () => {
                        if (value.length > 1) {
                            toast.error('Une erreur est survenue lors de la suppression des images.')
                        } else {
                            toast.error('Une erreur est survenue lors de la suppression de l\'image.')
                        }
                    },
                })
            } else {
                await deleteFileById({
                    variables: {
                        id: value.id,
                    },
                    onCompleted: () => {
                        toast.success("L'image a bien été supprimé.")
                        setFieldValue(field, {})
                        setFileName('')
                    },
                    onError: () => {
                        toast.error("Une erreur est survenue lors de la suppression de l'image.")
                    },
                })
            }
        } else {
            if (value.length > 1) {
                toast.success('Les images ont été supprimés avec succès.')
            } else {
                toast.success('L\'image a été supprimée avec succès.')
            }
        }

        return setFieldValue(field, null)
    }

    useEffect(() => {
        if (!imageName) {
            setFileName(rawField?.title ?? '')
        }
    }, [rawField]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Popover
            open={open}
            onClose={handleClose}
            className="justify-start items-center w-full"
            classNamePop="flex flex-col items-start justify-start w-full bg-dark rounded-md top-[64px] overflow-y-auto"
            content={
                <ul className="flex flex-col w-full">
                    {/* <li 
                        onClick={() => handleOpenModal(<FileUploaderUrl handleUpdateFile={handleUpdateFile} />)} 
                        className="group flex justify-start items-center cursor-pointer hover:bg-main py-2 px-3 w-full transition-all"
                    >
                        <AiOutlineLink className="mr-3 text-300 group-hover:text-200 transition-all" />
                        <p className="text-400 group-hover:text-300 transition-all">Importer une image depuis un lien</p>
                    </li> */}
                    <li
                        onClick={() => handleOpenModal(
                            <FileUploader
                                handleUpdateFile={(record: any | any[]) => {
                                    setSource(false)
                                    handleUpdateFile(record)
                                }}
                                fileLimit={fileLimit}
                                type="image"
                            />
                        )}
                        className="group flex justify-start items-center cursor-pointer hover:bg-main py-2 px-3 w-full transition-all"
                    >
                        <AiOutlineUpload className="mr-3 text-300 group-hover:text-200 transition-all" />
                        <p className="text-400 group-hover:text-300 transition-all">Importer une image depuis le poste</p>
                    </li>
                    <li
                        onClick={() => handleModal(
                            <FileUploaderGallery
                                multiple={fileLimit ? fileLimit > 1 : false}
                                currentSelectedIds={
                                    value ?
                                        (Array.isArray(value) ? value.map((item: any) => item.id) :
                                            [value.id]) : []
                                }
                                handleUpdateParent={(record: any | any[]) => {
                                    setSource(true)
                                    handleUpdateFile(record)
                                }}
                                defaultFilter={[{ type: { _contains: 'image' } }]}
                                defaultFilterName="_image_select"
                                title={'Images'}
                                Icon={MdOutlineImage}
                                closeAction={() => setSource(true)}
                            />,
                            "bg-default top-0 right-0 absolute md:w-[80%]"
                        )}
                        className="group flex justify-start items-center cursor-pointer hover:bg-main py-2 px-3 w-full transition-all"
                    >
                        <BsImages className="mr-3 text-300 group-hover:text-200 transition-all" />
                        <p className="text-400 group-hover:text-300 transition-all">Choisir une image dans la galerie</p>
                    </li>
                </ul>
            }
        >
            <Input
                onClick={() => { setOpen(true) }}
                setFieldValue={setFieldValue}
                value={imageName === '' ? 'Aucune image sélectionnée' : imageName}
                name={name}
                type={'text'}
                disabled={true}
                field={field}
                required={required}
                label={label}
                className={className + ' input-file'}
                Icon={value ? MdOutlineOpenInNew : null}
                SecondIcon={value ? MdDeleteOutline : null}
                IconAction={() => {
                    handleModal(
                        <ImagePreview file={value} />,
                        "absolute w-fit h-fit flex justify-center items-center"
                    )
                }}
                SecondIconAction={() => { handleDeleteFileIfExist() }}
            />
        </Popover>
    )
}


export default InputImage