import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import EditRecordForm from 'components/forms/EditRecordForm'
import { NextSeo } from 'next-seo'


const ArticlesEdit = () => {
	return (
		<>
			<NextSeo
				title="Edition d'un article"
				description="Page d'édition d'un article"
			/>
			<AdminLayout>
				<EditRecordForm collection={'articles'} />
			</AdminLayout>
		</>
	)
}


export default ArticlesEdit

