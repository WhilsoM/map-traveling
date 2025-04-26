import { EmailAuth, PhoneAuth } from '@components/ChooseAuth'
import { ButtonUi } from '@ui/index'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import s from '../sign.module.scss'

export const SignIn = () => {
	const { handleSubmit } = useForm()
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [activeTab, setActiveTab] = useState('phone')
	const navigate = useNavigate()
	// TODO: FIX THIS PAGE TWO FORMS AND MAKE CREATE
	return (
		<div className='container container-wrapper'>
			<h1 className='section-title'>Авторизация</h1>

			<form className={s.form}>
				{activeTab === 'email' && <EmailAuth setEmail={setEmail} />}
				{activeTab === 'phone' && <PhoneAuth setPhone={setPhone} />}

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
					Войти в аккаунт
				</ButtonUi>
			</form>

			<p className={s['sign-text']}>
				Нету аккаунта ?{' '}
				<Link className={s['sign-link']} to={'/auth/register'}>
					Зарегистрироваться
				</Link>
			</p>
		</div>
	)
}
