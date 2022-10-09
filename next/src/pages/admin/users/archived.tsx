import ContentManager from 'components/ui/global/ContentManager'
import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { AiOutlineUser } from 'react-icons/ai/index'
import { NextSeo } from 'next-seo'


const ArchivedUsers = () => {
	return (
		<>
			<NextSeo
				title="Utilisateurs archivés"
				description="Liste des utilisateurs archivés"
			/>
			<AdminLayout>
				<ContentManager
					title='Utilisateurs'
					Icon={AiOutlineUser}
					collection='users'
					mode='edit'
					type='grid'
					gridProperties={{
						title: '{{first_name}} {{last_name}}',
						subTitle: '{{email}}',
						image: '{{avatar}}',
						defaultIcon: AiOutlineUser,
					}}
					createAction={'unavailable'}
					forceFields='id email first_name last_name avatar { id title type modified_on filesize }'
					system={true}
					defaultFilter={[{ status: { _eq: 'archived' } }]}
					deleteAction={'restore'}
					defaultUrl={'/admin/users'}
				/>
			</AdminLayout>
		</>
	)
}


export default ArchivedUsers

