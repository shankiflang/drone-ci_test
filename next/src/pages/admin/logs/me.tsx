import ContentManager from 'components/ui/global/ContentManager'
import React from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useCurrentUser } from 'components/providers/UserProvider'
import { MdPersonOutline } from 'react-icons/md/index'
import { NextSeo } from 'next-seo'


const Logs = () => {
	const { user: currentUser } = useCurrentUser()

	return (
		<>
			<NextSeo
				title="Historique personnel"
				description="Liste des actions effectuées sur la plateforme"
			/>
			<AdminLayout>
				<ContentManager
					title='Historique personnel'
					Icon={MdPersonOutline}
					collection='activity'
					mode='view'
					type='table'
					startFields='action timestamp user { id email first_name last_name } collection'
					system={true}
					defaultOrderValue={'-timestamp'}
					defaultFilter={[{ user: { id: { _eq: currentUser?.id } } }]}
					defaultFilterName="_me"
				/>
			</AdminLayout>
		</>
	)
}


export default Logs

