import {
	useCallback,
	type Dispatch,
	type RefObject,
	type SetStateAction,
} from 'react'
import { useTranslation } from 'react-i18next'

interface useCheckValidationPostProps {
	firstInputRef: RefObject<HTMLInputElement | null>
	secondInputRef: RefObject<HTMLInputElement | null>
	country: string
	city: string
	setError: Dispatch<
		SetStateAction<{
			error: boolean
			message: string
		}>
	>
}

export const useCheckValidationPost = () => {
	const { t } = useTranslation()

	return useCallback(
		({
			firstInputRef,
			secondInputRef,
			country,
			city,
			setError,
		}: useCheckValidationPostProps) => {
			const MIN_LENGTH = 3

			if (country.length < MIN_LENGTH || !country) {
				setError({
					error: true,
					message: t('posts.fieldneedwrite', { field: t('posts.country') }),
				})
				return
			}
			if (city.length < MIN_LENGTH || !city) {
				setError({
					error: true,
					message: t('posts.fieldneedwrite', { field: t('posts.city') }),
				})
				return
			}
			if (
				(firstInputRef.current && firstInputRef.current?.value.length < 1) ||
				(secondInputRef.current && secondInputRef.current?.value.length < 1)
			) {
				setError({
					error: true,
					message: 'Заполните даты',
				})
				return
			}

			setError({ error: false, message: '' })
		},
		[t]
	)
}
