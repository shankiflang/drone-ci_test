import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import ContentManager from 'components/ui/global/ContentManager'
import { RiArticleLine } from 'react-icons/ri/index'
import { NextSeo } from 'next-seo'



const Articles = () => {
	return (
		<>
			<NextSeo
				title="Liste des articles"
				description="Page de tous les articles"
			/>
			<AdminLayout>
				<ContentManager collection="articles" mode="edit" type="table" Icon={RiArticleLine} />
			</AdminLayout>
		</>
	)
}



export default Articles

