import { EmailAuth, PhoneAuth } from '@components/ChooseAuth'
import { formEmailSignIn, formPhoneSignIn } from '@shared/config/const'
import { ButtonUi } from '@ui/index'
import { useState } from 'react'
import { Link } from 'react-router'
import s from '../sign.module.scss'

export const SignIn = () => {
	const [activeTab, setActiveTab] = useState('email')

	const condition = activeTab === 'email' ? formEmailSignIn : formPhoneSignIn

	return (
		<div className='container container-wrapper'>
			<h1 className='section-title'>Авторизация</h1>

			{activeTab === 'email' && (
				<EmailAuth method='auth' id={formEmailSignIn} />
			)}
			{activeTab === 'phone' && (
				<PhoneAuth method='auth' id={formPhoneSignIn} />
			)}

			{/* SLICE TO COMPONENT THIS */}
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

			<ButtonUi form={condition} className={s['button-submit']} type='submit'>
				Войти в аккаунт
			</ButtonUi>

			<p className={s['sign-text']}>
				Нету аккаунта ?{' '}
				<Link className={s['sign-link']} to={'/auth/register'}>
					Зарегистрироваться
				</Link>
			</p>
		</div>
	)
}
