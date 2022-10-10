// @ts-ignore
import { createReactEditorJS } from 'react-editor-js'
// @ts-ignore
import Embed from '@editorjs/embed'
// @ts-ignore
import Header from '@editorjs/header'
// @ts-ignore
import ImageTool from '@editorjs/image'
// @ts-ignore
import List from '@editorjs/list'
// @ts-ignore
import LinkTool from '@editorjs/link'
// @ts-ignore
import Quote from '@editorjs/quote'
// @ts-ignore
import RawTool from '@editorjs/raw'
// @ts-ignore
import ColorPlugin from 'editorjs-text-color-plugin'
// @ts-ignore
import Paragraph from 'editorjs-paragraph-with-alignment'
// @ts-ignore
import FontSize from 'editorjs-inline-font-size-tool'
import { directusFileUpload } from 'lib/files/'
import { useImportFileFromUrlMutation } from 'graphql/generated/hooks'
import { useCurrentUser } from 'components/providers/UserProvider';
import React from 'react'
import refactorEditorjsJson from 'lib/utils/refactorEditorjsJson'
import { toast } from 'react-toastify'


interface Props {
	setFieldValue: any
	field: string
	value: any
}


const CustomEditor = ({ setFieldValue, field, value }: Props) => {
	const { user: currentUser } = useCurrentUser()
	const [importFileFromUrl] = useImportFileFromUrlMutation()

	const EDITOR_JS_TOOLS = {
		list: List,
		header: {
			class: Header,
			inlineToolbar: true,
		},
		paragraph: {
			class: Paragraph,
			inlineToolbar: true,
		},
		link: LinkTool,
		embed: Embed,
		quote: Quote,
		raw: RawTool,
		fontSize: FontSize,
		color: {
			class: ColorPlugin,
			config: {
				defaultColor: 'white',
				type: 'text',
			},
		},
		market: {
			class: ColorPlugin,
			config: {
				defaultColor: 'white',
				type: 'marker',
			},
		},
		image: {
			class: ImageTool,
			config: {
				uploader: {
					uploadByFile: async (file: any) => {
						let { data: newFile } = await directusFileUpload({
							file,
							data: {
								title: (file as File).name!,
								uploaded_by: currentUser?.id,
							},
						})

						if (newFile?.data?.id && newFile?.data?.title) {
							toast.success(`${newFile.data.title} ajouté avec succès.`)
							return {
								success: 1,
								file: {
									url: process.env.NEXT_PUBLIC_BACKEND_URL + '/assets/' + newFile.data.id,
								},
							}
						} else {
							toast.error("Il y a eu problème lors de l'importation de l'image.")
							return {
								success: 0,
							}
						}
					},
					uploadByUrl: async (url: string) => {
						// https://img1.freepng.fr/20171221/wtw/orange-clipart-picture-5a3bc417de6034.2128742015138662639109.jpg
						let file_name = url.split('/')?.pop()?.slice(-50)
						if (file_name) {
							await importFileFromUrl({
								variables: {
									url: url,
									data: {
										modified_on: new Date().toISOString(),
										uploaded_on: new Date().toISOString(),
										storage: 'local',
										filename_download: file_name,
									},
								},
								onError: () => {
									toast.error("Il y a eu problème lors de l'importation de l'image.")
									return {
										success: 0,
									}
								},
								onCompleted: (data: any) => {
									if (data?.import_file?.id) {
										toast.success("Image importée avec succès.")
										return {
											success: 1,
											file: {
												url: process.env.NEXT_PUBLIC_BACKEND_URL + '/assets/' + data.import_file.id,
											},
										}
									}
								},
							})
						} else {
							toast.error("Impossible d'extraire le nom de l'image depuis l'URL.")
							return {
								success: 0,
							}
						}
					},
				},
			},
		},
	}

	const ReactEditorJS = createReactEditorJS()

	const editorCore = React.useRef(null)

	const handleInitialize = React.useCallback((instance: any) => {
		editorCore.current = instance
	}, [])

	const handleChange = async () => {
		// @ts-ignore
		let data = await editorCore.current.save()
		return setFieldValue(field, data)
	}

	return (
		<ReactEditorJS
			tools={EDITOR_JS_TOOLS}
			defaultValue={refactorEditorjsJson(value, true)}
			onInitialize={handleInitialize}
			onChange={handleChange}
			i18n={{
				messages: {
					ui: {
						blockTunes: {
							toggler: {
								'Click to tune': 'Cliquer pour éditer',
								'or drag to move': 'Changer de position',
							},
						},
						inlineToolbar: {
							converter: {
								'Convert to': 'Convertir en',
							},
						},
						toolbar: {
							toolbox: {
								Add: 'Ajouter',
							},
						},
					},
					toolNames: {
						Text: 'Paragraphe',
						Heading: 'Titre',
						List: 'Liste',
						Quote: 'Citation',
						'Raw HTML': 'HTML',
						Table: 'Tableau',
						Link: 'Lien',
						Marker: 'Surligneur',
						Bold: 'Gras',
						Italic: 'Italic',
					},
					tools: {
						warning: {
							Title: 'Titre',
							Message: 'Message',
						},
						link: {
							'Add a link': 'Ajouter un lien',
						},
						stub: {
							'The block can not be displayed correctly.': 'Le bloc ne peut pas être affiché correctement.',
						},
					},
					blockTunes: {
						delete: {
							Delete: 'Supprimer',
						},
						moveUp: {
							'Move up': 'Remonter le bloc',
						},
						moveDown: {
							'Move down': 'Descendre le bloc',
						},
					},
				},
			}}
		/>
	)
}

export default CustomEditor