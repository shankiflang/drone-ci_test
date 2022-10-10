import ContentManager from 'components/ui/global/ContentManager'
import { NextSeo } from 'next-seo'
import React from 'react'
import { MdDeleteOutline } from 'react-icons/md/index'
import AdminLayout from '../../../components/layouts/AdminLayout'


const Logs = () => {
	return (
		<>
			<NextSeo
				title="Historique des suppressions"
				description="Liste des suppressions"
			/>
			<AdminLayout>
				<ContentManager
					title='Historique des supressions'
					Icon={MdDeleteOutline}
					collection='activity'
					mode='view'
					type='table'
					startFields='action timestamp user { id email first_name last_name } collection'
					system={true}
					defaultOrderValue={'-timestamp'}
					defaultFilter={[{ action: { _contains: 'delete' } }]}
					defaultFilterName="_delete"
				/>
			</AdminLayout>
		</>
	)
}


export default Logs

