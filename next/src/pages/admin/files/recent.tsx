import FileUploader from 'components/modals/FileUploader'
import { useModal } from 'components/providers/ModalProvider'
import ContentManager from 'components/ui/global/ContentManager'
import formatBytes from 'lib/utils/formatBytes'
import React from 'react'
import { MdTimer } from 'react-icons/md/index'
import AdminLayout from '../../../components/layouts/AdminLayout'
import moment from 'moment'
import { NextSeo } from 'next-seo'


const Files = () => {
	const { handleModal } = useModal()

	return (
		<>
			<NextSeo
				title="Fichiers récents"
				description="Liste de tous les fichiers récents de la plateforme"
			/>
			<AdminLayout>
				<ContentManager
					title='Fichiers récents'
					Icon={MdTimer}
					collection='files'
					mode='edit'
					type='grid'
					forceFields='title type modified_on filesize'
					system={true}
					gridProperties={{
						title: '{{title}}',
						subTitle: '{{filesize}}',
						subTitleFormatter: formatBytes,
					}}
					defaultOrderValue={'-uploaded_on'}
					createAction={(props: any) => handleModal(<FileUploader fileLimit={10} props={props} />, "absolute w-fit h-fit flex justify-center items-center")}
					defaultFilterName="_recent"
					defaultFilter={[{ uploaded_on: { _gte: moment().add(-72, 'hours') } }]}
					defaultUrl={'/admin/files'}
				/>
			</AdminLayout>
		</>
	)
}

export default Files

