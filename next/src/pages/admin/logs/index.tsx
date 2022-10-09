import ContentManager from 'components/ui/global/ContentManager'
import { NextSeo } from 'next-seo'
import React from 'react'
import { AiOutlineFileProtect } from 'react-icons/ai/index'
import AdminLayout from '../../../components/layouts/AdminLayout'


const Logs = () => {
	return (
		<>
			<NextSeo
				title="Historique de la plateforme"
				description="Liste de toutes les actions effectuées sur la plateforme"
			/>
			<AdminLayout>
				<ContentManager
					title='Historique global'
					Icon={AiOutlineFileProtect}
					collection='activity'
					mode='view'
					type='table'
					startFields='action timestamp user { id email first_name last_name } collection'
					system={true}
					defaultOrderValue={'-timestamp'}
				/>
			</AdminLayout>
		</>
	)
}


export default Logs

