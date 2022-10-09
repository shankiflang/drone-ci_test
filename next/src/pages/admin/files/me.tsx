import FileUploader from 'components/modals/FileUploader'
import { useModal } from 'components/providers/ModalProvider'
import ContentManager from 'components/ui/global/ContentManager'
import formatBytes from 'lib/utils/formatBytes'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai/index'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useCurrentUser } from 'components/providers/UserProvider'
import { NextSeo } from 'next-seo'


const Files = () => {
	const { handleModal } = useModal()
	const { user: currentUser } = useCurrentUser()

	return (
		<>
			<NextSeo
				title="Fichiers personnels"
				description="Liste de tous les fichiers personnels"
			/>
			<AdminLayout>
				<ContentManager
					title='Fichiers personnels'
					Icon={AiOutlineUser}
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
					defaultFilterName="_me"
					defaultFilter={[{ uploaded_by: { id: { _eq: currentUser?.id } } }]}
					defaultUrl={'/admin/files'}
				/>
			</AdminLayout>
		</>
	)
}

export default Files

