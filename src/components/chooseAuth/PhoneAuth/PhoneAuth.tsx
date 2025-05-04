import { auth } from '@api/firebase'
import { ButtonUi, InputUi } from '@shared/ui'
import {
	ConfirmationResult,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from 'firebase/auth'

import {
	ClipboardEvent,
	KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import s from '../choose-auth.module.scss'
import { AuthProps } from '../types'

const CODE_LENGTH = 6

export const PhoneAuth = ({ id }: AuthProps) => {
	const [phone, setPhone] = useState('')
	const [code, setCode] = useState('')
	const [error, setError] = useState({ message: '' })
	const [confirmationResult, setConfirmationResult] =
		useState<ConfirmationResult | null>(null)
	const [values, setValues] = useState<string[]>(Array(CODE_LENGTH).fill(''))
	const inputsRef = useRef<Array<HTMLInputElement | null>>([])

	const recaptchaContainer = useRef<HTMLDivElement>(null)
	const { t } = useTranslation()

	useEffect(() => {
		if (!(window as any).recaptchaVerifier && recaptchaContainer.current) {
			;(window as any).recaptchaVerifier = new RecaptchaVerifier(
				auth,
				recaptchaContainer.current,
				{
					size: 'invisible',
					callback: () => {
						console.log('reCAPTCHA пройден')
					},
				}
			)
		}
	}, [])

	const saveFullCode = () => {
		let fullCode = ''

		for (let i = 0; i < inputsRef.current.length; i++) {
			fullCode += inputsRef.current[i]?.value
		}
		setCode(fullCode)
		return fullCode
	}

	const sendCode = async () => {
		const verifier = (window as any).recaptchaVerifier

		try {
			const result = await signInWithPhoneNumber(auth, phone, verifier)

			setConfirmationResult(result)
			console.log('Код отправлен!')
		} catch (error) {
			setError({
				message: t('phoneauth.errorsendcode'),
			})
			console.error('Ошибка отправки кода:', error)
		}
	}

	const verifyCode = async () => {
		const code = saveFullCode()
		try {
			if (!confirmationResult) return

			const res = await confirmationResult.confirm(code)

			console.log('Пользователь вошёл:', res.user)
		} catch (err) {
			setError({
				message: t('phoneauth.verifycode'),
			})
			console.error('Неверный код:', err)
		}
	}

	const handleChange = (value: string, index: number) => {
		if (!/^\d?$/.test(value)) return

		const newValues = [...values]
		newValues[index] = value
		setValues(newValues)

		if (value && index < CODE_LENGTH - 1) {
			inputsRef.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !values[index] && index > 0) {
			inputsRef.current[index - 1]?.focus()
		}
	}

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		const paste = e.clipboardData.getData('text').slice(0, CODE_LENGTH)
		if (!/^\d+$/.test(paste)) return

		const pasteArray = paste.split('')
		const newValues = [...values]

		pasteArray.forEach((char, i) => {
			if (i < CODE_LENGTH) {
				newValues[i] = char
				inputsRef.current[i]?.focus()
			}
		})

		setValues(newValues)
	}

	return (
		<>
			<form
				id={id}
				className={s.form}
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
				<label className={'label'}>
					{t('phone')}
					<InputUi
						className={'input'}
						type='tel'
						inputMode='numeric'
						variants='outlined'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</label>

				<ButtonUi
					disabled={phone.length < 5}
					className={`${s.sendCode} ${phone.length < 5 ? s.disabled : null}`}
					onClick={sendCode}
				>
					{t('phoneauth.sendcode')}
				</ButtonUi>

				<div ref={recaptchaContainer}></div>

				{confirmationResult && (
					<>
						{values.map((value, i) => (
							<InputUi
								key={i}
								ref={(el) => {
									return (inputsRef.current[i] = el)
								}}
								type='text'
								inputMode='numeric'
								variants='outlined'
								maxLength={1}
								className={s['input-code']}
								value={value}
								onChange={(e) => handleChange(e.target.value, i)}
								onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
									handleKeyDown(e, i)
								}
								onPaste={handlePaste}
							/>
						))}
						<ButtonUi variants='fill' onClick={verifyCode}>
							{t('phoneauth.confirm')}
						</ButtonUi>
					</>
				)}
			</form>
			{error.message.length !== 1 && <p className='error'>{error.message}</p>}
		</>
	)
}
