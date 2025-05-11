import { auth } from '@api/firebase'
import { useCheckValidationEmail } from '@shared/hooks/useCheckValidationEmail'
import { InputUi } from '@ui/index'
import { FirebaseError } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import s from './choose-auth.module.scss'

export const EmailAuth = ({ id, method }: { id: string; method: string }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ email: '', password: '' })
	const navigate = useNavigate()
	const { t } = useTranslation()

	const registerWithEmail = async (email: string, password: string) => {
		useCheckValidationEmail({ email, password, setErrors })

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			const token = await userCredential.user.getIdToken()

			if (token) {
				navigate('/home')
			}
		} catch (error) {
			if (
				error instanceof FirebaseError &&
				error.code === 'auth/email-already-in-use'
			) {
				console.log('Пользователь с такой почтой уже существует.')
			} else {
				console.log('Ошибка регистрации: ' + error)
			}
			console.error('Registration failed', error)
		}
	}

	const handleSignIn = (email: string, password: string) => {
		const auth = getAuth()
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user

				console.log('User signed in:', user)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				console.error('Sign-in error:', errorCode, errorMessage)
			})
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (method === 'register') {
			registerWithEmail(email, password)
		} else {
			handleSignIn(email, password)
		}
	}
	return (
		<>
			<form className={s.form} id={id} onSubmit={(e) => handleSubmit(e)}>
				<label className='label'>
					{t('email')}
					<InputUi
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='input'
						variants='outlined'
						type='email'
					/>
				</label>

				<label className={'label'}>{t('password')}</label>
				<InputUi
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={'input'}
					variants='outlined'
					type='password'
				/>
			</form>

			{errors.email && <p className={'error'}>{errors.email}</p>}
			{errors.password && <p className={'error'}>{errors.password}</p>}
		</>
	)
}
