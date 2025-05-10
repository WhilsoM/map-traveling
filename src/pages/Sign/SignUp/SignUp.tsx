import { EmailAuth } from '@components/EmailAuth/EmailAuth'
import { formEmailSignUp, formPhoneSignUp } from '@shared/config/const'
import { ButtonUi } from '@ui/index'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import s from '../sign.module.scss'

export const SignUp = () => {
	const [activeTab, setActiveTab] = useState('email')
	const { t } = useTranslation()
	const condition = activeTab === 'email' ? formEmailSignUp : formPhoneSignUp

	return (
		<div className={`${s['sign-up']} container container-wrapper`}>
			<h1 className='section-title'>Регистрация</h1>

			<EmailAuth method='register' id={formEmailSignUp} />

			{/* {activeTab === 'phone' && (
				<PhoneAuth method='register' id={formPhoneSignUp} />
			)} */}

			<div className={`${s['sign-up-methods']}`}>
				<p className={s['sign-up-text']}>Методы регистрации</p>

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

			<ButtonUi
				className={`btn ${s['button-submit']}`}
				form={condition}
				type='submit'
			>
				{t('signup.register')}
			</ButtonUi>

			<p className={s['sign-text']}>
				{t('signup.alreadyhaveaccount')} ?{' '}
				<Link className={s['sign-link']} to={'/auth/login'}>
					{t('signup.signin')}
				</Link>
			</p>
		</div>
	)
}
