import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import EditUserForm from 'components/forms/EditUserForm'
import { NextSeo } from 'next-seo'


const Profil = () => {
    return (
        <>
            <NextSeo
                title="Profil"
                description="Page de modification du profil"
            />
            <AdminLayout>
                <EditUserForm />
            </AdminLayout>
        </>
    )
}


export default Profil