import ContentManager from 'components/ui/global/ContentManager'
import { NextSeo } from 'next-seo'
import React from 'react'
import { IoMdAdd } from 'react-icons/io/index'
import AdminLayout from '../../../components/layouts/AdminLayout'


const Logs = () => {
	return (
		<>
			<NextSeo
				title="Historique des créations"
				description="Liste des créations"
			/>
			<AdminLayout>
				<ContentManager
					title='Historique des créations'
					Icon={IoMdAdd}
					collection='activity'
					mode='view'
					type='table'
					startFields='action timestamp user { id email first_name last_name } collection'
					system={true}
					defaultOrderValue={'-timestamp'}
					defaultFilter={[{ action: { _contains: 'create' } }]}
					defaultFilterName="_create"
				/>
			</AdminLayout>
		</>
	)
}


export default Logs

