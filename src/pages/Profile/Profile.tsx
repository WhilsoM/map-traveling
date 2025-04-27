import { auth } from '@api/firebase'
import { emailRegex, nameRegex, phoneRegex } from '@shared/config/regex'
import { ButtonUi, InputUi } from '@ui/index'
import { getAuth, signOut } from 'firebase/auth'
import { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import s from './profile.module.scss'
export const Profile = () => {
	const user = useAuthState(auth)
	const [isClick, setIsClick] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [surname, setSurname] = useState('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState('')
	const [error, setError] = useState({ isValid: false, message: '' })
	const fileRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()

	if (user[0]?.email === undefined) return
	if (user[0]?.phoneNumber === undefined) return

	const userEmail = user[0].email
	const userPhone = user[0].phoneNumber

	const handleClick = () => {
		console.log(fileRef)

		checkValidation()
		console.log(error)

		if (!error.isValid) return

		setIsClick(true)
	}

	const checkValidation = () => {
		if (!firstName || !surname) {
			return setError({ isValid: false, message: 'Имя и фамилия обязательны' })
		}

		if (!phone && !email) {
			return setError({
				isValid: false,
				message: 'Телефон или email обязателен',
			})
		}

		if (!nameRegex.test(firstName) || !nameRegex.test(surname)) {
			return setError({
				isValid: false,
				message:
					'Имя и фамилия могут содержать только буквы и некоторые специальные символы',
			})
		}

		if (phone && !phoneRegex.test(phone)) {
			return setError({
				isValid: false,
				message: 'Неверный формат телефона. Пример: +7(123)456-78-90',
			})
		}

		if (email && !emailRegex.test(email)) {
			return setError({ isValid: false, message: 'Неверный формат email' })
		}

		return setError({ isValid: true, message: 'Данные валидны' })
	}

	const handleLogout = () => {
		const auth = getAuth()

		signOut(auth)
			.then(() => {
				console.log('User signed out')
				navigate('/auth/register')
			})
			.catch((error) => {
				console.error('Sign out error', error)
			})
	}

	return (
		<div className={`container ${s.profile}`}>
			<form className={s.profile__form}>
				<div>
					<p>Загрузить Аватар</p>
					<input type='file' ref={fileRef} accept='image/png, image/jpeg' />
					{isClick && <img src={fileRef.current?.value} alt='avatar' />}
				</div>

				<label className='label' htmlFor='name'>
					Имя
				</label>
				<InputUi
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					className='input'
					type='text'
					variants='outlined'
					id='name'
				/>

				<label className='label' htmlFor='surname'>
					Фамилия
				</label>
				<InputUi
					value={surname}
					onChange={(e) => setSurname(e.target.value)}
					className={`input `}
					type='text'
					variants='outlined'
					id='surname'
				/>
				{userPhone ? (
					<>
						<p className='label'>Телефон</p>
						<p className='input outlined'>{userPhone}</p>
					</>
				) : (
					<>
						<label className='label' htmlFor='phone'>
							Телефон
						</label>
						<InputUi
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className='input'
							type='text'
							variants='outlined'
							id='phone'
						/>
					</>
				)}

				{userEmail ? (
					<>
						<p className='label'>Email</p>

						<p className='input outlined'>{userEmail}</p>
					</>
				) : (
					<>
						<label className='label' htmlFor='email'>
							Email
						</label>
						<InputUi
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='input'
							type='email'
							variants='outlined'
							id='email'
						/>
					</>
				)}

				{!error.isValid && error.message && (
					<p className='error'>{error.message}</p>
				)}

				<ButtonUi
					onClick={handleClick}
					className={`btn ${s.saveData}`}
					variants='fill'
					type='submit'
				>
					{isClick ? 'Сохранено' : 'Сохранить'}
				</ButtonUi>
			</form>
			<ButtonUi onClick={handleLogout} className={s.logout}>
				Выйти из аккаунта
			</ButtonUi>
		</div>
	)
}
