import React, { useEffect, useMemo } from 'react'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCreateUserMutation } from 'graphql/generated/hooks'
import * as yup from 'yup'
import Button from 'components/ui/buttons/Button'
import { BiChevronLeft, BiUserCircle } from 'react-icons/bi/index'
import { MdCheck, MdMenu, MdOutlineEmail } from 'react-icons/md/index'
import Input from 'components/ui/inputs/Input'
import InputHash from 'components/ui/inputs/InputHash'
import InputImage from 'components/ui/inputs/InputImage'
import InputSelect from 'components/ui/inputs/InputSelect'
import InputBoolean from 'components/ui/inputs/InputBoolean'
import InputSelectM2O from 'components/ui/inputs/InputSelectM2O'
import { useResponsive } from 'components/hooks/useResponsive'
import { useCurrentUser } from 'components/providers/UserProvider'


const createUserSchema = yup.object().shape({
    email: yup.string().email("L'email est invalide.").required("L'email est obligatoire."),
})



const CreateUserForm = () => {
    /*
    *   Context
    */
    const router = useRouter()
    const redirectUrl = router.asPath.slice(0, router.asPath.lastIndexOf('/'))
    const { setSidebarOpen } = useCurrentUser();
    const screen = useResponsive();


    /*
    *   Data hooks
    */
    const [createUser] = useCreateUserMutation()


    return (
        <div className="w-full flex flex-col items-start justify-start text-100 p-8 mb-16">
            <Formik
                initialValues={{
                    first_name: null,
                    last_name: null,
                    email: '',
                    password: null,
                    avatar: null,
                    location: null,
                    title: null,
                    status: 'active',
                    theme: 'auto',
                    tfa_secret: false,
                    role: undefined,
                }}
                validationSchema={createUserSchema}
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

                    createUser({
                        variables: {
                            data: {
                                provider: 'default',
                                ...newValues,
                                tfa_secret: null,
                            },
                        },
                        onCompleted: () => {
                            toast.success("L'utilisateur a bien été créé.")
                            return router.push(redirectUrl)
                        },
                        onError: (error: any) => {
                            if (error.message === 'Field "email" has to be unique.') {
                                return toast.error("L'email est déjà utilisé.")
                            }

                            return toast.error("Une erreur est survenue lors de la création de l'utilisateur.")
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
                            <div className="flex flex-row justify-start items-center h-14 max-w-[calc(100vw-108px)] md:max-w-none">
                                {
                                    (screen === 'sm' || screen === 'md') ?
                                        (
                                            <MdMenu
                                                className="bg-l-main dark:bg-d-main rounded-full w-11 h-11 p-2.5 text-200 hover:bg-light transition-all cursor-pointer"
                                                onClick={() => setSidebarOpen(true)}
                                            />
                                        ) : (
                                            <Link href={redirectUrl}>
                                                <a>
                                                    <Button variant="secondary" className="w-11 h-11 rounded-full flex justify-center items-center" name="Retour en arrière" tooltip={true}>
                                                        <BiChevronLeft className="w-full h-full" />
                                                    </Button>
                                                </a>
                                            </Link>
                                        )
                                }
                                <h1 className="ml-4 text-2xl text-100 truncate w-[calc(100vw-108px-44px)] sm:w-fit">
                                    Créer un utilisateur
                                </h1>
                            </div>
                            <div className="flex flex-row justify-start items-center h-14">
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
                        <div className="flex flex-col lg:flex-row  justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] mt-4 lg:mb-12 lg:mt-10">
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
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-12">
                            <div className="w-full my-4 lg:my-0">
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
                        <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-8">
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
                            <h2 className="text-xl mt-4 lg:mb-4 lg:mt-0">
                                Préférences de l'utilisateur
                            </h2>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-10">
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
                                    label='Double auth'
                                    setFieldValue={formikProps.setFieldValue}
                                    value={formikProps.values.tfa_secret}
                                    field='tfa_secret'
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-full lg:min-w-[650px] lg:w-[50%]">
                            <h2 className="text-xl lg:mb-4 mt-4 lg:mt-0">
                                Options administrateur
                            </h2>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:min-w-[650px] lg:w-[50%] lg:mb-10">
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
                            variant="primary"
                            className="w-full lg:min-w-[650px] lg:w-[50%] h-11 rounded-md mt-6 lg:mt-2 mb-16"
                            submit={true}
                            name="Sauvegarder"
                        >
                            Sauvegarder
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    )
}


export default CreateUserForm