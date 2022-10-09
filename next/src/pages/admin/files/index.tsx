import FileUploader from 'components/modals/FileUploader'
import { useModal } from 'components/providers/ModalProvider'
import ContentManager from 'components/ui/global/ContentManager'
import formatBytes from 'lib/utils/formatBytes'
import { NextSeo } from 'next-seo'
import React from 'react'
import { AiOutlineFolderOpen } from 'react-icons/ai/index'
import AdminLayout from '../../../components/layouts/AdminLayout'


const Files = () => {
	const { handleModal } = useModal()

	return (
		<>
			<NextSeo
				title="Liste des fichiers"
				description="Liste de tous les fichiers de la plateforme"
			/>
			<AdminLayout>
				<ContentManager
					title='Tous les fichiers'
					Icon={AiOutlineFolderOpen}
					collection='files'
					mode='edit'
					type='grid'
					forceFields='title type modified_on filesize filename_download'
					system={true}
					gridProperties={{
						title: '{{title}}',
						subTitle: '{{filesize}}',
						subTitleFormatter: formatBytes,
					}}
					defaultOrderValue={'-uploaded_on'}
					downloadable={true}
					createAction={(props: any) => handleModal(<FileUploader fileLimit={10} props={props} />, "absolute w-fit h-fit flex justify-center items-center")}
				/>
			</AdminLayout>
		</>
	)
}

export default Files

