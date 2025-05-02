import { EmailAuth, PhoneAuth } from '@components/ChooseAuth'
import { formEmailSignUp, formPhoneSignUp } from '@shared/config/const'
import { ButtonUi } from '@ui/index'
import { useState } from 'react'
import { Link } from 'react-router'
import s from '../sign.module.scss'

export const SignUp = () => {
	const [activeTab, setActiveTab] = useState('email')

	const condition = activeTab === 'email' ? formEmailSignUp : formPhoneSignUp

	return (
		<div className={`${s['sign-up']} container container-wrapper`}>
			<h1 className='section-title'>Регистрация</h1>

			{activeTab === 'email' && (
				<EmailAuth method='register' id={formEmailSignUp} />
			)}
			{activeTab === 'phone' && (
				<PhoneAuth method='register' id={formPhoneSignUp} />
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

			<ButtonUi
				className={`btn ${s['button-submit']}`}
				form={condition}
				type='submit'
			>
				Зарегистрироваться
			</ButtonUi>

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
