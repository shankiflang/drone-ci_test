import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Input from 'components/ui/inputs/Input'
import InputHash from 'components/ui/inputs/InputHash'
import Button from 'components/ui/buttons/Button'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'


const validationSchemaBasic = yup.object({
    email: yup.string().email("L'email est invalide.").required("L'email est requis."),
    password: yup.string().required('Le mot de passe est requis.'),
})

const validationSchemaOtp = yup.object({
    email: yup.string().email("L'email est invalide.").required("L'email est requis."),
    password: yup.string().required('Le mot de passe est requis.'),
    otp: yup.string().required("L'OTP est requis."),
})



interface Props {
    // csrfToken: string,
    admin: boolean,
}



export default function LoginForm({ admin }: Props) {
    const [isOtpNecessary, setIsOtpNecessary] = useState(false)
    const router = useRouter()

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                image: null,
                otp: '',
            }}
            validationSchema={isOtpNecessary ? validationSchemaOtp : validationSchemaBasic}
            onSubmit={async (values) => {
                const { email, password, otp } = values

                const res = await signIn('credentials', {
                    redirect: false,
                    admin,
                    email,
                    password,
                    otp,
                    callbackUrl: admin ? '/admin/content/articles' : '/dashboard',
                })

                if (res?.error) {
                    if (res.error === 'OTP.') {
                        if (isOtpNecessary) {
                            return toast.error('L\'OTP est incorrect.')
                        }
                        return setIsOtpNecessary(true)
                    }

                    return toast.error('Les identifiants sont incorrects.')
                } else {
                    toast.success('Vous êtes connecté.')
                    return router.push(admin ? '/admin/content/articles' : '/dashboard')
                }
            }}
        >
            {(formikProps) => (
                <form
                    className="w-full flex justify-start items-start flex-col flex-wrap mt-1"
                    onSubmit={formikProps.handleSubmit}
                >
                    <Input
                        type="email"
                        field="email"
                        name="email"
                        label="Email"
                        className='my-3'
                        value={formikProps.values.email}
                        setFieldValue={formikProps.setFieldValue}
                    />
                    <InputHash
                        field="password"
                        name="password"
                        label="Mot de passe"
                        className='my-3'
                        value={formikProps.values.password}
                        setFieldValue={formikProps.setFieldValue}
                    />
                    {isOtpNecessary && (
                        <Input
                            name='otp'
                            field='otp'
                            label='One-Time Password'
                            type='text'
                            className="my-3"
                            value={formikProps.values.otp}
                            setFieldValue={formikProps.setFieldValue}
                        />
                    )}
                    <Button
                        name="Se connecter"
                        submit={true}
                        className="mt-2"
                    >
                        Se connecter
                    </Button>
                </form>
            )}
        </Formik>
    )
}