import ContentManager from 'components/ui/global/ContentManager'
import React, { useMemo } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { AiOutlineUser } from 'react-icons/ai/index'
import { NextSeo } from 'next-seo'


const Users = () => {
	return (
		<>
			<NextSeo
				title="Utilisateurs"
				description="Liste des utilisateurs"
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
					defaultFilter={[{ status: { _neq: 'archived' } }]}
					deleteAction={'archieve'}
				/>
			</AdminLayout>
		</>
	)
}


export default Users

