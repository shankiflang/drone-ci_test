import ContentManager from 'components/ui/global/ContentManager'
import { NextSeo } from 'next-seo'
import React from 'react'
import { MdCheck } from 'react-icons/md/index'
import AdminLayout from '../../../components/layouts/AdminLayout'


const Logs = () => {
	return (
		<>
			<NextSeo
				title="Historique des mises à jour"
				description="Liste des actions de mise à jour effectuées sur la plateforme"
			/>
			<AdminLayout>
				<ContentManager
					title='Historique des mises à jour'
					Icon={MdCheck}
					collection='activity'
					mode='view'
					type='table'
					startFields='action timestamp user { id email first_name last_name } collection'
					system={true}
					defaultOrderValue={'-timestamp'}
					defaultFilter={[{ action: { _contains: 'update' } }]}
					defaultFilterName="_update"
				/>
			</AdminLayout>
		</>
	)
}


export default Logs

