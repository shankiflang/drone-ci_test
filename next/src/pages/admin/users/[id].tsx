import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import EditUserForm from '../../../components/forms/EditUserForm'
import { NextSeo } from 'next-seo'



const EditUsers = () => {

    return (
        <>
            <NextSeo
                title="Edition d'un utilisateur"
                description="Page de modification d'un utilisateur"
            />
            <AdminLayout>
                <EditUserForm />
            </AdminLayout>
        </>
    )
}


export default EditUsers