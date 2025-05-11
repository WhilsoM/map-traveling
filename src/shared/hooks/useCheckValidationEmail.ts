import { Dispatch, SetStateAction, useCallback } from 'react'
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

export const useCheckValidationEmail = () => {
	const { t } = useTranslation()

	return useCallback(
		({ email, password, setErrors }: checkValidationEmailProps) => {
			if (email.length && password.length) {
				setErrors({
					email: '',
					password: '',
				})
				return
			}

			setErrors({
				email: t('emailauth.incorrectemail'),
				password: t('emailauth.incorrectpassword'),
			})
		},
		[t]
	)
}
