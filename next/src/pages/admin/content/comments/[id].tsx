import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import EditRecordForm from 'components/forms/EditRecordForm'
import { NextSeo } from 'next-seo'


const CommentsEdit = (
) => {
	return (
		<>
			<NextSeo
				title="Edition d'un commentaire"
				description="Page d'édition d'un commentaire"
			/>
			<AdminLayout>
				<EditRecordForm collection={'comments'} />
			</AdminLayout>
		</>
	)
}


export default CommentsEdit

