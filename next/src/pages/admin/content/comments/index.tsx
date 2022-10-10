import React from 'react'
import AdminLayout from 'components/layouts/AdminLayout'
import ContentManager from 'components/ui/global/ContentManager'
import { AiOutlineComment } from 'react-icons/ai/index'
import { NextSeo } from 'next-seo'


const Comments = () => {
	return (
		<>
			<NextSeo
				title="Liste des commentaires"
				description="Page de tous les commentaires"
			/>
			<AdminLayout>
				<ContentManager title="Commentaires" collection="comments" mode="edit" type="table" Icon={AiOutlineComment} />
			</AdminLayout>
		</>
	)
}

export default Comments

