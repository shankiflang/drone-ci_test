import ContentManager from 'components/ui/global/ContentManager'
import { NextSeo } from 'next-seo'
import React from 'react'
import { AiOutlineRobot } from 'react-icons/ai/index'
import AdminLayout from '../../../components/layouts/AdminLayout'


const Logs = () => {
	return (
		<>
			<NextSeo
				title="Historique des programmes"
				description="Liste des actions effectuées sur la plateforme automatiquement"
			/>
			<AdminLayout>
				<ContentManager
					title='Historique des programmes'
					Icon={AiOutlineRobot}
					collection='activity'
					mode='view'
					type='table'
					startFields='action timestamp user { id email first_name last_name } collection'
					system={true}
					defaultOrderValue={'-timestamp'}
					defaultFilter={[{ action: { _contains: 'run' } }]}
					defaultFilterName="_run"
				/>
			</AdminLayout>
		</>
	)
}


export default Logs

