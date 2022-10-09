import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import EditFileForm from '../../../components/forms/EditFileForm'
import { NextSeo } from 'next-seo'



const EditFile = () => {

    return (
        <>
            <NextSeo
                title="Edition d'un fichier"
                description="Page d'edition d'un fichier"
            />
            <AdminLayout>
                <EditFileForm />
            </AdminLayout>
        </>
    )
}


export default EditFile