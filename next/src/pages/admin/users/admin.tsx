import ContentManager from 'components/ui/global/ContentManager'
import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { AiOutlineUser } from 'react-icons/ai/index'
import { NextSeo } from 'next-seo'


const AdminUsers = () => {
	return (
		<>
			<NextSeo
				title="Administrateurs"
				description="Liste des administrateurs"
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
					forceFields='id email first_name last_name avatar { id title type modified_on filesize }'
					system={true}
					defaultFilter={[{ role: { admin_access: { _eq: true } } }, { status: { _neq: 'archived' } }]}
					deleteAction={'archieve'}
					defaultUrl={'/admin/users'}
				/>
			</AdminLayout>
		</>
	)
}


export default AdminUsers

