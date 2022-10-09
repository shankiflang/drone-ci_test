import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import CreateRecordForm from 'components/forms/CreateRecordForm'
import { NextSeo } from 'next-seo'


const CommentsCreate = () => {
	return (
		<>
			<NextSeo
				title="Création d'un commentaire"
				description="Page de création d'un commentaire"
			/>
			<AdminLayout>
				<CreateRecordForm collection={'comments'} />
			</AdminLayout>
		</>
	)
}


export default CommentsCreate

