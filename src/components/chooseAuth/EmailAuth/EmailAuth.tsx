import { auth } from '@api/firebase'
import { InputUi } from '@ui/index'
import { type FirebaseError } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import s from '../choose-auth.module.scss'
import { type AuthProps } from '../types'

export const EmailAuth = ({ id, method }: AuthProps) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ email: '', password: '' })
	const navigate = useNavigate()

	const registerWithEmail = async (email: string, password: string) => {
		checkValidation()

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const token = await userCredential.user.getIdToken()
			console.log('user registered:', userCredential)
			console.log(token)

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
				console.log(user)

				console.log('User signed in:', user)
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				console.error('Sign-in error:', errorCode, errorMessage)
			})
	}

	const checkValidation = () => {
		if (email.length && password.length) {
			setErrors({
				email: '',
				password: '',
			})
		}
		if (!email || !password) {
			setErrors({
				email: 'Неверно заполнена почта',
				password: 'Неверно заполнен пароль',
			})
			return
		}
		return
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		if (method === 'register') {
			console.log('register')

			registerWithEmail(email, password)
		} else {
			console.log('auth')

			handleSignIn(email, password)
		}
	}
	return (
		<>
			<form className={s.form} id={id} onSubmit={(e) => handleSubmit(e)}>
				<label className='label'>
					Почта
					<InputUi
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='input'
						variants='outlined'
						type='email'
					/>
				</label>

				<label className={'label'}>Пароль</label>
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
