import { EmailAuth } from '@components/ChooseAuth/emailAuth/EmailAuth'
import { formEmailSignIn, formPhoneSignIn } from '@shared/config/const'
import { ButtonUi } from '@ui/index'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import s from '../sign.module.scss'

export const SignIn = () => {
	const [activeTab, setActiveTab] = useState('email')
	const { t } = useTranslation()
	const condition = activeTab === 'email' ? formEmailSignIn : formPhoneSignIn

	return (
		<div className='container container-wrapper'>
			<h1 className='section-title'>Авторизация</h1>

			<EmailAuth method='auth' id={formEmailSignIn} />

			{/* {activeTab === 'phone' && (
				<PhoneAuth method='auth' id={formPhoneSignIn} />
			)} */}

			{/* SLICE TO COMPONENT THIS */}
			<div className={`${s['sign-up-methods']}`}>
				<p className={s['sign-up-text']}>Методы Авторизации</p>

				<div className={`${s['methods-wrapper']}`}>
					<ButtonUi
						className={activeTab === 'email' ? 'active' : ''}
						onClick={() => setActiveTab('email')}
						type='button'
					>
						{t('email')}
					</ButtonUi>
					<ButtonUi
						className={activeTab === 'phone' ? 'active' : ''}
						onClick={() => setActiveTab('phone')}
						type='button'
						disabled
						title='в разработке'
					>
						{t('phone')}
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
