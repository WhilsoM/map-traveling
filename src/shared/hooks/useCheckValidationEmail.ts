import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface checkValidationEmailProps {
	email: string
	password: string
	setErrors: Dispatch<
		SetStateAction<{
			email: string
			password: string
		}>
	>
}

export const useCheckValidationEmail = ({
	email,
	password,
	setErrors,
}: checkValidationEmailProps) => {
	const { t } = useTranslation()

	if (email.length && password.length) {
		setErrors({
			email: '',
			password: '',
		})
	}
	if (!email || !password) {
		setErrors({
			email: t('emailauth.incorrectemail'),
			password: t('emailauth.incorrectpassword'),
		})
		return
	}

	return
}
