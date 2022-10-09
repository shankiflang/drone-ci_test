import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import Button from 'components/ui/buttons/Button'
import Input from 'components/ui/inputs/Input'
import { useImportFileFromUrlMutation } from 'graphql/generated/hooks'


interface Props {
    handleClose: any
    handleUpdateFile: (id: any, name: string) => void
}



const UploadFileUrlForm = ({
    handleClose,
    handleUpdateFile,
}: Props) => {
    const [loading, setLoading] = React.useState(false)
    const [importFileFromUrl] = useImportFileFromUrlMutation()

    return (
        <Formik
            initialValues={{
                url: '',
            }}
            onSubmit={(values) => {
                setLoading(true)
                if (values.url) {
                    let file_name = values?.url?.split('/')?.pop()
                    if (file_name) {
                        importFileFromUrl({
                            variables: {
                                url: values.url,
                                data: {
                                    modified_on: new Date().toISOString(),
                                    uploaded_on: new Date().toISOString(),
                                    storage: 'local',
                                    filename_download: file_name,
                                },
                            },
                            onCompleted: (data) => {
                                handleUpdateFile(data?.import_file?.id, file_name as string)
                                toast.success("Le fichier a bien été importé.")
                                setLoading(false)
                                handleClose()
                            },
                            onError: (error) => {
                                if (error.message) {
                                    if (error.message.includes("Couldn't fetch file from url")) {
                                        toast.error('Le lien ne pointe pas vers un fichier.')
                                    }
                                    if (error.message.includes("Couldn't save file")) {
                                        toast.error("Le fichier n'a pas pu être sauvegardé.")
                                    }
                                }
                                setLoading(false)
                            },
                        })
                    }
                } else {
                    setLoading(false)
                }
            }}
        >
            {(formikProps) => (
                <form
                    className="w-full flex justify-start items-start flex-col flex-wrap mt-2"
                    onSubmit={formikProps.handleSubmit}
                >
                    <Input
                        label="URL"
                        type="url"
                        name="Importer un fichier depuis une URL"
                        field="url"
                        value={formikProps.values.url}
                        setFieldValue={formikProps.setFieldValue}
                    />
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
                            name="Importer"
                            className="ml-2"
                            submit={true}
                            disabled={loading}
                            variant="primary"
                        >
                            Importer
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    )
}


export default UploadFileUrlForm