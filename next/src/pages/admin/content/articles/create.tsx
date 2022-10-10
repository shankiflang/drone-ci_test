import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import CreateRecordForm from 'components/forms/CreateRecordForm'
import { NextSeo } from 'next-seo'


const ArticlesCreate = () => {
	return (
		<>
			<NextSeo
				title="Création d'un article"
				description="Page de création d'un article"
			/>
			<AdminLayout>
				<CreateRecordForm collection={'articles'} />
			</AdminLayout>
		</>
	)
}


export default ArticlesCreate

