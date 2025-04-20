import { auth } from '@api/firebase'
import { ButtonUi, InputUi } from '@ui/index'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

export const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const registerWithEmail = async (email: string, password: string) => {
		if (!email || !password) {
			alert('Введите email и пароль!')
			return
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			console.log('user registered:', userCredential)
			// TODO: редирект или показать успех
			if (userCredential.user.accessToken) {
				navigate('/home')
			} else {
				setError('Ошибка регистрации, нету токена')
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
		<div className='container container-wrapper'>
			<h1>Регистрация</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					registerWithEmail(email, password)
				}}
			>
				<label htmlFor='email'>Почта</label>
				<InputUi
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					variants='outlined'
					type='email'
				/>

				<label htmlFor='password'>Пароль</label>
				<InputUi
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					id='password'
					variants='outlined'
					type='password'
				/>

				{/* CREATE COMPONENT USER CAN CHOOSE PHONE OR EMAIL */}
				{/* <label htmlFor='phoneNumber'>Номер телефона</label>
				<InputUi type='text' id='phoneNumber' variants='outlined' /> */}
				{/* USE COMPONENT CHOOSEAUTH HERER */}
				<ButtonUi type='submit'>Зарегистрироваться</ButtonUi>

				<p>
					Нажимая кнопку Зарегистрироваться вы соглашаетесь с{' '}
					<Link to={'/auth/policy'}>Политикой конфиденциальности</Link>
				</p>
			</form>
		</div>
	)
}
