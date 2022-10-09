import { useModal } from "components/providers/ModalProvider"
import Button from "components/ui/buttons/Button"
import InputHash from "components/ui/inputs/InputHash"
import { Formik } from "formik"
import { useGenerateOtpMutation } from "graphql/generated/hooks"
import * as yup from 'yup'
import OTPEnable from "./OTPEnable"



const validationSchema = yup.object({
	password: yup.string().required('Le mot de passe est requis.'),
})


interface GenerateOTPFormProps {
	handleClose?: any
}


const OTPGenerate = ({ handleClose }: GenerateOTPFormProps) => {
	const [generateOTP] = useGenerateOtpMutation()

    const { handleModal } = useModal()

	return (
		<div className="max-w-full flex justify-start items-start flex-col p-8 bg-default rounded-lg">
			<p className="text-400 mb-4">Entrez votre mot de passe pour activer l'OTP</p>
			<Formik
				initialValues={{
					password: '',
				}}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					generateOTP({
						variables: {
							password: values.password,
						},
						onCompleted: (data) => {
							if (data.users_me_tfa_generate && data.users_me_tfa_generate.otpauth_url && data.users_me_tfa_generate.secret) {
                                handleModal(<OTPEnable otpAuth={data.users_me_tfa_generate}/>, "absolute w-fit h-fit flex justify-center items-center")
							}
						},
						onError: () => {
							handleClose()
						},
					})
				}}
			>
				{(formikProps) => (
					<>
						<form onSubmit={formikProps.handleSubmit} className="w-full flex justify-start items-start flex-col flex-wrap">
							<div className="w-full mb-4">
								<InputHash
									field='password'
                                    label='Mot de passe'
									setFieldValue={formikProps.setFieldValue}
									value={formikProps.values.password}
									name='Mot de passe'
									required={true}
								/>
							</div>
							<div className="w-full">
								<Button submit={true} variant="primary" name="Valider">
									Valider
								</Button>
							</div>
						</form>
					</>
				)}
			</Formik>
		</div>
	)
}


export default OTPGenerate