import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import CreateUserForm from '../../../components/forms/CreateUserForm'
import { NextSeo } from 'next-seo'



const CreateUser = () => {

    return (
        <>
            <NextSeo
                title="Création d'utilisateur"
                description="Page de création d'un utilisateur"
            />
            <AdminLayout>
                <CreateUserForm />
            </AdminLayout>
        </>
    )
}


export default CreateUser