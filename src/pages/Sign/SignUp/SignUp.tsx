import { auth } from '@api/firebase'
import { EmailAuth, PhoneAuth } from '@components/ChooseAuth'
import { ButtonUi } from '@ui/index'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import s from '../sign.module.scss'

export const SignUp = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [errors, setErrors] = useState({ email: '', password: '', phone: '' })
	const [activeTab, setActiveTab] = useState('email')
	const inpRef = useRef(null)
	const navigate = useNavigate()

	const registerWithEmail = async (email: string, password: string) => {
		console.log(email, password)

		if (email.length && password.length) {
			setErrors({
				email: '',
				password: '',
				phone: '',
			})
			return
		}
		if (!email || !password) {
			setErrors({
				email: 'Неверно заполнена почта',
				password: 'Неверно заполнен пароль',
				phone: '',
			})
			return
		}
		if (!phone) {
			setErrors({ email: '', password: '', phone: 'Неверно заполнен пароль' })
			return
		}

		return
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const token = await userCredential.user.getIdToken()
			console.log('user registered:', userCredential)
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
		<div className={`${s['sign-up']} container container-wrapper`}>
			<h1 className='section-title'>Регистрация</h1>

			<form
				className={s.form}
				onSubmit={(e) => {
					e.preventDefault()
					registerWithEmail(email, password)
				}}
			>
				{activeTab === 'email' && (
					<EmailAuth
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
					/>
				)}
				{activeTab === 'phone' && (
					<PhoneAuth phone={phone} setPhone={setPhone} />
				)}

				<div className={`${s['sign-up-methods']}`}>
					<p className={s['sign-up-text']}>Методы регистрации</p>

					<div className={`${s['methods-wrapper']}`}>
						<ButtonUi
							className={activeTab === 'email' ? 'active' : ''}
							onClick={() => setActiveTab('email')}
							type='button'
						>
							Почта
						</ButtonUi>
						<ButtonUi
							className={activeTab === 'phone' ? 'active' : ''}
							onClick={() => setActiveTab('phone')}
							type='button'
						>
							Номер телефона
						</ButtonUi>
					</div>
				</div>

				<ButtonUi className={s['button-submit']} type='submit'>
					Зарегистрироваться
				</ButtonUi>
			</form>
			{errors.email && <p className={s.error}>{errors.email}</p>}
			{errors.password && <p className={s.error}>{errors.password}</p>}
			{errors.phone && <p className={s.error}>{errors.phone}</p>}

			<p className={s['sign-text']}>
				Уже есть аккаунт ?{' '}
				<Link className={s['sign-link']} to={'/auth/login'}>
					Войти
				</Link>
			</p>
			<p className={s['sign-text']}>
				Нажимая кнопку Зарегистрироваться вы соглашаетесь с{' '}
				<Link className={s['sign-link']} to={'/auth/policy'}>
					Политикой конфиденциальности
				</Link>
			</p>
		</div>
	)
}
