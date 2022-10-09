import { useModal } from "components/providers/ModalProvider"
import Button from "components/ui/buttons/Button"
import Input from "components/ui/inputs/Input"
import { Formik } from "formik"
import { useDisableOtpMutation, useGetCurrentUserQuery } from "graphql/generated/hooks"
import { toast } from "react-toastify"
import * as yup from 'yup'



const validationSchema = yup.object({
	otp: yup.string().required("L'OTP est requis."),
})


interface GenerateOTPFormProps {
	handleClose?: any
}


const OTPDisable = ({ handleClose }: GenerateOTPFormProps) => {
	const { refetch } = useGetCurrentUserQuery()
	const [disableOTP] = useDisableOtpMutation()

	return (
		<div className="max-w-full flex justify-start items-start flex-col p-8 bg-default rounded-lg">
			<p className="text-400 mb-4">Entrez l'OTP pour le désactiver</p>
			<Formik
				initialValues={{
					otp: '',
				}}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					disableOTP({
						variables: {
							otp: values.otp,
						},
						onCompleted: (data) => {
							if (data && data.users_me_tfa_disable) {
								refetch()
								toast.success("L'OTP a bien été désactivé.")
								handleClose()
							} else {
								toast.error("Une erreur est survenue lors de la désactivation de l'OTP.")
							}
						},
						onError: (error) => {
							if (error.message === '"otp" is invalid') {
								toast.error("L'OTP est invalide.")
							} else {
								toast.error("Une erreur est survenue lors de la désactivation de l'OTP.")
							}
						},
					})
				}}
			>
				{(formikProps) => (
					<>
						<form onSubmit={formikProps.handleSubmit} className="w-full flex justify-start items-start flex-col flex-wrap">
							<div className="w-full mb-4">
								<Input
									field='otp'
                                    label='OTP'
									setFieldValue={formikProps.setFieldValue}
									value={formikProps.values.otp}
									name='OTP'
									required={true}
                                    type="text"
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


export default OTPDisable