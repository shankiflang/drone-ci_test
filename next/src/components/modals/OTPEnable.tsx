import { useModal } from "components/providers/ModalProvider"
import Button from "components/ui/buttons/Button"
import InputHash from "components/ui/inputs/InputHash"
import { Formik } from "formik"
import { useEnableOtpMutation, useGenerateOtpMutation, useGetCurrentUserQuery } from "graphql/generated/hooks"
import { useEffect } from "react"
import { toast } from "react-toastify"
import * as yup from 'yup'
import QRCode from 'react-qr-code'
import Input from "components/ui/inputs/Input"



const validationSchema = yup.object({
    otp: yup.string().required("L'OTP est requis."),
})


interface GenerateOTPFormProps {
    handleClose?: any
    otpAuth: any
}


const OTPEnable = ({ handleClose, otpAuth }: GenerateOTPFormProps) => {

    /*
    *  Data Hooks
    */
    const [enableOTP] = useEnableOtpMutation()
    const { refetch } = useGetCurrentUserQuery()


    /*
    *  Effects
    */
    useEffect(() => {
        if (otpAuth.secret === '' || otpAuth.otpauth_url === '') {
            handleClose()
        }
    }, [otpAuth, handleClose])


    return (
        <div className="max-w-full flex justify-start items-start flex-col p-8 bg-default rounded-lg">
            <p className="text-400 mb-6 text-center w-full">
                Scanner le code dans votre application de double authentification et entrez le code.
            </p>
            <div className="flex justify-center items-center w-full flex-col">
                <QRCode value={otpAuth.otpauth_url} className="border-[9px] border-gray-500 box-content" />
                <p className="mt-2 text-400">{otpAuth.secret}</p>
            </div>
            <Formik
                initialValues={{
                    otp: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    enableOTP({
                        variables: {
                            otp: values.otp,
                            secret: otpAuth.secret,
                        },
                        onCompleted: (data) => {
                            if (data.users_me_tfa_enable) {
                                refetch()
                                toast.success('OTP activé avec succès.')
                                handleClose()
                            } else {
                                toast.error('Erreur lors de l\'activation de l\'OTP.')
                            }
                        },
                        onError: () => {
                            toast.error('Erreur lors de l\'activation de l\'OTP.')
                        }
                    })
                }}
            >
                {(formikProps) => (
                    <form onSubmit={formikProps.handleSubmit} className="w-full flex justify-start items-start flex-col flex-wrap">
                        <div className="w-full">
                            <Input
                                className="mt-6 mb-2"
                                required={true}
                                label="OTP"
                                name="otp"
                                field="otp"
                                type="text"
                                value={formikProps.values.otp}
                                setFieldValue={formikProps.setFieldValue}
                            />
                        </div>
                        <div className="w-full">
                            <Button
                                submit={true}
                                variant="primary"
                                className="mt-4"
                                name="Valider"
                            >
                                Valider
                            </Button>
                        </div>
                    </form>            
                )}
            </Formik>
        </div>
    )
}


export default OTPEnable