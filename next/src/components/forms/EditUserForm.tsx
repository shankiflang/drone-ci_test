import React, { useEffect, useMemo } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCurrentUser } from 'components/providers/UserProvider'
import { useUpdateUserByIdMutation } from 'graphql/generated/hooks'
import { useUser } from 'components/hooks/useUser'
import * as yup from 'yup'
import omitDeep from 'omit-deep-lodash'
import Button from 'components/ui/buttons/Button'
import { BiChevronLeft, BiUserCircle } from 'react-icons/bi/index'
import { MdCheck, MdMenu, MdOutlineArchive, MdOutlineEmail, MdOutlineRestore } from 'react-icons/md/index'
import Input from 'components/ui/inputs/Input'
import InputHash from 'components/ui/inputs/InputHash'
import InputImage from 'components/ui/inputs/InputImage'
import InputSelect from 'components/ui/inputs/InputSelect'
import InputBoolean from 'components/ui/inputs/InputBoolean'
import InputSelectM2O from 'components/ui/inputs/InputSelectM2O'
import { useModal } from 'components/providers/ModalProvider'
import OTPGenerate from 'components/modals/OTPGenerate'
import OTPDisable from 'components/modals/OTPDisable'
import { useResponsive } from 'components/hooks/useResponsive'


const editUserSchema = yup.object().shape({
    email: yup.string().email("L'email est invalide.").required("L'email est obligatoire."),
})



interface Props {
    title?: string
}



const EditUserForm = ({ title }: Props) => {
    /*
    *   Context
    */
    const router = useRouter()
    const { user: currentUser, setSidebarOpen } = useCurrentUser()
    const { handleModal } = useModal()
    const { id } = router.query
    const previousUrl = router.asPath.slice(0, router.asPath.lastIndexOf('/'))
    const redirectUrl = router.asPath.includes('profil') ? '/admin/profil' : previousUrl
    const screen = useResponsive();

    /*
    *   Data hooks
    */
    const [updateUser] = useUpdateUserByIdMutation()
    const { user, Avatar, userFullName } = useUser({ id: (id ? id as string : currentUser!.id!) })


    /*
    *   Functions
    */
    // handle delete
    const handleArchieve = async () => {
        if (id) {
            await updateUser({
                variables: {
                    id: id as string,
                    data: {
                        status: 'archived',
                    },
                },
                onCompleted: () => {
                    toast.success("L'utilisateur a été archivé avec succès.")
                    return router.push(redirectUrl)
                },
                onError: () => {
                    return toast.success("Une erreur est survenue lors de l'archivage de l'utilisateur.")
                },
            })
        }
    }

    // handle enable
    const handleRestore = async () => {
        if (id) {
            await updateUser({
                variables: {
                    id: id as string,
                    data: {
                        status: 'active',
                    },
                },
                onCompleted: () => {
                    toast.success("L'utilisateur a été réactivé avec succès.")
                    return router.push(redirectUrl)
                },
                onError: () => {
                    return toast.success("Une erreur est survenue lors de la réactivation de l'utilisateur.")
                },
            })
        }
    }

    return (
        <div className="w-full flex flex-col items-start justify-start text-100 p-8 mb-16">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    first_name: user?.users_by_id?.first_name,
                    last_name: user?.users_by_id?.last_name,
                    email: user?.users_by_id?.email,
                    password: '',
                    avatar: user?.users_by_id?.avatar,
                    location: user?.users_by_id?.location,
                    title: user?.users_by_id?.title,
                    status: user?.users_by_id?.status,
                    theme: user?.users_by_id?.theme,
                    tfa_secret: user?.users_by_id?.tfa_secret,
                    role: user?.users_by_id?.role,
                }}
                validationSchema={editUserSchema}
                onSubmit={async (values) => {
                    let newValues = { ...values } as any

                    if (!newValues.role || Object.keys(newValues.role).length === 0) {
                        newValues.role = null
                    }

                    if (!newValues.password) {
                        delete newValues.password
                    }

                    if (!newValues.avatar) {
                        newValues.avatar = null
                    }

                    updateUser({
                        variables: {
                            id: id ? id as string : currentUser?.id!,
                            data: {
                                ...omitDeep(newValues, ['__typename', 'tfa_secret']),
                            },
                        },
                        onCompleted: (data: any) => {
                            toast.success("L'utilisateur a bien été mis à jour.")
                            // set theme
                            return router.push(redirectUrl)
                        },
                        onError: (e: any) => {
                            toast.error("Une erreur est survenue lors de l'édition de l'utilisateur.")
                            return
                        },
                    })
                }}
            >
                {(formikProps) => (
                    <form
                        className="flex flex-col justify-start items-start w-full"
                        onSubmit={formikProps.handleSubmit}
                    >
                        <div className="flex flex-row justify-between items-start mb-4 h-14 w-full">
                            <div className="flex flex-row justify-start items-center h-14 max-w-[calc(100vw-176px)] md:max-w-none">
                                {
                                    (screen === 'sm' || screen === 'md') ?
                                        (
                                            <MdMenu
                                                className="bg-l-main dark:bg-d-main rounded-full min-w-11 min-h-11 w-11 h-11 p-2.5 text-200 hover:bg-light transition-all cursor-pointer"
                                                onClick={() => setSidebarOpen(true)}
                                            />
                                        ) : (
                                            <Link href={previousUrl}>
                                                <a>
                                                    <Button variant="secondary" className="w-11 h-11 rounded-full flex justify-center items-center" name="Retour en arrière" tooltip={true}>
                                                        <BiChevronLeft className="w-full h-full" />
                                                    </Button>
                                                </a>
                                            </Link>
                                        )
                                }
                                <h1 className="ml-4 text-2xl text-100 truncate w-[calc(100vw-176px-44px)] sm:w-fit">
                                    {title ? title : 'Editer un utilisateur'}
                                </h1>
                            </div>
                            <div className="flex flex-row justify-start items-center h-14">
                                {
                                    formikProps.values.status === 'archived' ? (
                                        <Button variant="secondary" className="w-11 h-11 mr-3 rounded-full group transition-all" onClick={handleRestore} name="Restorer" tooltip={true}>
                                        <MdOutlineRestore className="w-full h-full text-400 group-hover:text-300 transition-all" />
                                    </Button>
                                    ) : (
                                        <Button variant="secondary" className="w-11 h-11 mx-3 rounded-full group transition-all" onClick={handleArchieve} name="Archiver" tooltip={true}>
                                            <MdOutlineArchive className="w-full h-full text-400 group-hover:text-300 transition-all" />
                                        </Button>
                                    )
                                }
                                <Button
                                    variant="primary"
                                    className="w-11 h-11 rounded-full"
                                    submit={true}
                                    name="Sauvegarder"
                                    tooltip={true}
                                >
                                    <MdCheck className="w-full h-full" />
                                </Button>
                            </div>
                        </div>
                        <div className="w-full lg:min-w-[650px] lg:w-[50%] my-4 flex flex-col lg:flex-row justify-start items-center mt-6 mb-4 lg:mb-16 p-8 bg-main rounded-md">
                            <div className="rounded-full overflow-hidden w-40 h-40 border-4 bg-main shadow-sm">
                                <Avatar className="w-40 h-40" />
                            </div>
                            <div className="flex flex-col justify-start items-center lg:items-start lg:ml-6 text-400 mt-4 lg:mt-0 overflow-hidden flex-grow truncate">
                                <h6 className="text-100 truncate w-full text-center lg:text-start">{userFullName}</h6>
                                <p className="truncate w-full text-center lg:text-start">{user?.users_by_id?.email}</p>
                                <p className="truncate w-full text-center lg:text-start">{user?.users_by_id?.location}</p>
                                <p className="truncate w-full text-center lg:text-start">{user?.users_by_id?.title}</p>
                                <p className="truncate w-full text-center lg:text-start">{user?.users_by_id?.role?.name}</p>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:min-w-[650px] mt-4 lg:w-[50%] lg:mb-12 lg:mt-0">
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <Input
                                    label="Prénom"
                                    name="first_name"
                                    type="text"
                                    field="first_name"
                                    value={formikProps.values.first_name}
                                    setFieldValue={formikProps.setFieldValue}
                                    Icon={BiUserCircle}
                                    IconAction={false}
                                />
                            </div>
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <Input
                                    label="Nom"
                                    name="last_name"
                                    type="text"
                                    field="last_name"
                                    value={formikProps.values.last_name}
                                    setFieldValue={formikProps.setFieldValue}
                                    Icon={BiUserCircle}
                                    IconAction={false}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row  justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-12">
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    field="email"
                                    required={true}
                                    value={formikProps.values.email}
                                    setFieldValue={formikProps.setFieldValue}
                                    Icon={MdOutlineEmail}
                                    IconAction={false}
                                />
                            </div>
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <InputHash
                                    name='Mot de passe'
                                    label='Mot de passe'
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.password}
                                    field='password'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row  justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-12">
                            <div className="w-full my-6 lg:my-0">
                                <InputImage
                                    name='Avatar'
                                    label='Avatar'
                                    value={formikProps.values.avatar}
                                    rawField={formikProps.values.avatar}
                                    setFieldValue={formikProps.setFieldValue}
                                    field='avatar'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row  justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-4">
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <Input
                                    name='Adresse'
                                    label='Adresse'
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.location}
                                    field='location'
                                    type='text'
                                />
                            </div>
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <Input
                                    name='Fonction'
                                    label='Fonction'
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.title}
                                    field='title'
                                    type='text'
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-start items-start w-full lg:min-w-[650px] lg:w-[50%]">
                            <h2 className="text-xl mt-4 lg:mb-4 lg:mt-4">
                                Préférences de l'utilisateur
                            </h2>
                        </div>
                        <div className="flex flex-col lg:flex-row  justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-4">
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <InputSelect
                                    name='Theme'
                                    label='Theme'
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.theme}
                                    field='theme'
                                    values={[
                                        {
                                            name: 'Clair',
                                            value: 'light'
                                        },
                                        {
                                            name: 'Foncé',
                                            value: 'dark'
                                        },
                                        {
                                            name: 'Automatique',
                                            value: 'auto'
                                        }
                                    ]}
                                />
                            </div>
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <InputBoolean
                                    name='Double authentification'
                                    label='Double authentification'
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.tfa_secret}
                                    field='tfa_secret'
                                    disabled={id ? true : false}
                                    customEnableAction={() => handleModal(<OTPGenerate />, "absolute w-fit h-fit flex justify-center items-center")}
                                    customDisableAction={() => handleModal(<OTPDisable />, "absolute w-fit h-fit flex justify-center items-center")}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-full lg:min-w-[650px] lg:w-[50%]">
                            <h2 className="text-xl lg:mb-4 mt-4 lg:mt-4">
                                Options administrateur
                            </h2>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-4">
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <InputSelect
                                    name='Status'
                                    label='Status'
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.status}
                                    field='status'
                                    values={[
                                        {
                                            name: 'Brouillon',
                                            value: 'draft',
                                        },
                                        {
                                            name: 'Invité',
                                            value: 'invited',
                                        },
                                        {
                                            name: 'Actif',
                                            value: 'active',
                                        },
                                        {
                                            name: 'Bloqué',
                                            value: 'suspended',
                                        },
                                        {
                                            name: 'Archivé',
                                            value: 'archived',
                                        },
                                    ]}
                                />
                            </div>
                            <div className="w-full lg:w-[calc(50%-16px)] lg:max-w-[50%] my-6 lg:my-0">
                                <InputSelectM2O
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.role}
                                    field='role'
                                    name='Role'
                                    label='Role'
                                    foreign_key_table='roles'
                                    selectColumn='name'
                                    system={true}
                                    forceFields='name enforce_tfa admin_access app_access'
                                />
                            </div>
                        </div>
                        <Button
                            name="Sauvegarder"
                            variant="primary"
                            className="w-full lg:min-w-[650px] lg:w-[50%] h-11 rounded-md mt-6 mb-16"
                            submit={true}
                        >
                            Sauvegarder
                        </Button>
                    </form>
                )}
            </Formik>
        </div >
    )
}


export default EditUserForm