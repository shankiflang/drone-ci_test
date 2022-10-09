import ContentManager from 'components/ui/global/ContentManager'
import { NextSeo } from 'next-seo'
import React from 'react'
import { MdLogin } from 'react-icons/md/index'
import AdminLayout from '../../../components/layouts/AdminLayout'


const Logs = () => {
	return (
		<>
			<NextSeo
				title="Historique des connexions"
				description="Liste des connexions"
			/>
			<AdminLayout>
				<ContentManager
					title='Historique des connexions'
					Icon={MdLogin}
					collection='activity'
					mode='view'
					type='table'
					startFields='action timestamp user { id email first_name last_name } collection'
					system={true}
					defaultOrderValue={'-timestamp'}
					defaultFilter={[{ action: { _contains: 'login' } }]}
					defaultFilterName="_login"
				/>
			</AdminLayout>
		</>
	)
}


export default Logs

