import React, { useRef } from 'react'
import { Formik, FormikProps } from 'formik'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useCurrentUser } from 'components/providers/UserProvider'
import { useDeleteFileMutation, useGetFileByIdQuery, useUpdateFileMutation } from 'graphql/generated/hooks'
import { useFile } from 'components/hooks/useFile'
import * as yup from 'yup'
import Link from 'next/link'
import Button from 'components/ui/buttons/Button'
import { BiChevronLeft } from 'react-icons/bi'
import { useImage } from 'components/hooks/useImage'
import Input from 'components/ui/inputs/Input'
import { MdCheck, MdDeleteOutline, MdDownload, MdMenu } from 'react-icons/md'
import { useModal } from 'components/providers/ModalProvider'
import FileUploader from 'components/modals/FileUploader'
import { useResponsive } from 'components/hooks/useResponsive'


const editFileSchema = yup.object().shape({
    filename_download: yup.string().required('Le nom du fichier lors du téléchargement est requis.'),
})


const EditFileForm = () => {
    /*
    *   Context
    */
    const router = useRouter()
    const formikRef = useRef<FormikProps<any>>(null)
    const { id } = router.query
    const redirectUrl = router.asPath.slice(0, router.asPath.lastIndexOf('/'))
    const { handleModal } = useModal()
    const { setSidebarOpen } = useCurrentUser();
    const screen = useResponsive();



    /*
    *   Data hooks
    */
    // get file
    const { data: { files_by_id: file } = {}, refetch } = useGetFileByIdQuery({ variables: { id: id! as string } })
    // delete file
    const [deleteFile] = useDeleteFileMutation()
    // update file
    const [updateFile] = useUpdateFileMutation()
    // use file
    const { downloadURL, replaceFile } = useFile({ file })
    // use image of file
    const { Image } = useImage({ image: file, key: 'banner' })


    /*
    *   Functions
    */

    // handle delete
    const handleDelete = async () => {
        if (file?.id) {
            await deleteFile({
                variables: {
                    id: file.id,
                },
                onCompleted: () => {
                    toast.success('Le fichier a été supprimé avec succès.')
                    refetch()
                    return router.push(redirectUrl)
                },
                onError: () => {
                    return toast.error('Une erreur est survenue lors de la suppression du fichier.')
                },
            })
        }
    }


    return (
        <div className="w-full flex flex-col items-start justify-start text-100 p-8 mb-16">
            <Formik
                enableReinitialize
                innerRef={formikRef}
                initialValues={{
                    title: file?.title ?? '',
                    description: file?.description ?? '',
                    filename_download: file?.filename_download ?? '',
                }}
                validationSchema={editFileSchema}
                onSubmit={async (values) => {
                    let newValues = { ...values } as any

                    updateFile({
                        variables: {
                            id: id! as string,
                            data: {
                                ...newValues,
                            },
                        },
                        onCompleted: () => {
                            toast.success('Le fichier a bien été mis à jour.')
                            refetch()
                            return router.push(redirectUrl)
                        },
                        onError: () => {
                            toast.error("Une erreur est survenue lors de l'édition du fichier.")
                            return
                        },
                    })
                }}
            >
                {(formikProps) => (
                    <form
                        className="flex flex-col justify-start items-start w-full"
                        onSubmit={formikProps.handleSubmit}
                    >
                        <div className="flex flex-row justify-between items-start mb-4 h-14 w-full">
                            <div className="flex flex-row justify-start items-center h-14 max-w-[calc(100vw-220px)] md:max-w-none">
                                {
                                    (screen === 'sm' || screen === 'md') ?
                                        (
                                            <MdMenu
                                                className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200 hover:bg-light transition-all cursor-pointer"
                                                onClick={() => setSidebarOpen(true)}
                                            />
                                        ) : (
                                            <Link href={redirectUrl}>
                                                <a>
                                                    <Button variant="secondary" className="w-11 h-11 rounded-full flex justify-center items-center" name="Retour en arrière" tooltip={true}>
                                                        <BiChevronLeft className="w-full h-full" />
                                                    </Button>
                                                </a>
                                            </Link>
                                        )
                                }
                                <h1 className="ml-4 text-2xl text-100 truncate w-[calc(100vw-220px-44px)] md:w-[calc(100vw-220px-44px-320px)] lg:w-fit">
                                    Modifier un fichier
                                </h1>
                            </div>
                            <div className="flex flex-row justify-start items-center h-14">
                                <Button variant="secondary" className="w-11 h-11 rounded-full group transition-all" onClick={handleDelete} name="Supprimer" tooltip={true}>
                                    <MdDeleteOutline className="w-full h-full text-400 group-hover:text-300 transition-all" />
                                </Button>
                                <a href={downloadURL}>
                                    <Button variant="secondary" className="w-11 h-11 mx-3 rounded-full group transition-all" name="Télécharger" tooltip={true}>
                                        <MdDownload className="w-full h-full text-400 group-hover:text-300 transition-all" />
                                    </Button>
                                </a>
                                <Button
                                    variant="primary"
                                    className="w-11 h-11 rounded-full"
                                    submit={true}
                                    name="Sauvegarder"
                                    tooltip={true}
                                >
                                    <MdCheck className="w-full h-full" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Image
                                className="w-full xl:max-w-[682px] xl:max-h-[528px] rounded-2xl bg-main overflow-hidden flex flex-col justify-center items-center mt-4"
                                fileTypeClassName="py-6 text-lg"
                                alt="Image du fichier"
                            />
                            <p
                                className="transition-all cursor-pointer h-9 text-primary-main mt-2 mb-8 hover:text-l-primary-light dark:hover:text-d-primary-light"
                                onClick={() => handleModal(<FileUploader replaceFileAction={replaceFile} replaceFileRefetch={() => refetch()} replaceFileId={file?.id} />, "absolute w-fit h-fit flex justify-center items-center")}
                            >
                                Remplacer le fichier
                            </p>
                        </div>
                        <div className="flex flex-row justify-between items-start w-full max-w-[682px] mb-12">
                            <Input
                                name="title"
                                field="title"
                                label="Titre"
                                setFieldValue={formikProps.setFieldValue}
                                value={formikProps.values.title}
                                type="text"

                            />
                        </div>
                        <div className="flex flex-row justify-between items-start w-full max-w-[682px] mb-12">
                            <Input
                                name="description"
                                field="description"
                                label="Description"
                                setFieldValue={formikProps.setFieldValue}
                                value={formikProps.values.description}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-row justify-between items-start w-full max-w-[682px] mb-8">
                            <Input
                                name="filename_download"
                                field="filename_download"
                                label="Titre de téléchargement"
                                setFieldValue={formikProps.setFieldValue}
                                value={formikProps.values.filename_download}
                                type="text"
                                required={true}
                            />
                        </div>
                        <Button
                            variant="primary"
                            className="w-full max-w-[682px] h-11 rounded-md mt-3 mb-8"
                            submit={true}
                            name="Sauvegarder"
                        >
                            Sauvegarder
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    )
}


export default EditFileForm