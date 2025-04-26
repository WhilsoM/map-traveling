import { auth } from '@api/firebase'
import { InputUi } from '@ui/index'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import s from '../choose-auth.module.scss'
import { AuthProps } from '../types'

export const EmailAuth = ({ id }: AuthProps) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ email: '', password: '' })
	const inpRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()

	const registerWithEmail = async (email: string, password: string) => {
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
		} catch (error: any) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Пользователь с такой почтой уже существует.')
			} else {
				alert('Ошибка регистрации: ' + error.message)
			}
			console.error('Registration failed', error)
		}
	}
	return (
		<>
			<form
				className={s.form}
				id={id}
				onSubmit={(e) => {
					e.preventDefault()
					registerWithEmail(email, password)
				}}
			>
				<label className={s.label} htmlFor='email'>
					Почта
				</label>
				<InputUi
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={s.input}
					id='email'
					variants='outlined'
					type='email'
				/>

				<label className={s.label} htmlFor='password'>
					Пароль
				</label>
				<InputUi
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={s.input}
					id='password'
					variants='outlined'
					type='password'
				/>
			</form>

			{errors.email && <p className={'error'}>{errors.email}</p>}
			{errors.password && <p className={'error'}>{errors.password}</p>}
		</>
	)
}
