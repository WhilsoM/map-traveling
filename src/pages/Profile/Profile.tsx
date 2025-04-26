import { emailRegex, nameRegex, phoneRegex } from '@shared/config/regex'
import { ButtonUi, InputUi } from '@ui/index'
import { useState } from 'react'
import s from './profile.module.scss'
export const Profile = () => {
	const [isClick, setIsClick] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [surname, setSurname] = useState('')
	const [phone, setPhone] = useState<string>('')
	const [email, setEmail] = useState('')
	const [error, setError] = useState({ isValid: false, message: '' })

	const handleClick = () => {
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

	return (
		<div className={`container ${s.profile}`}>
			{/* TODO: FEAT ADD AVATAR */}

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

			{/* TODO: CHECK WHO IS USER CHOICE FOR REGISTER AND DON'T EDIT THS, PHONE OR EMAIL */}
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
			{!error.isValid && error.message && (
				<p className='error'>{error.message}</p>
			)}
			<ButtonUi
				onClick={handleClick}
				className={`btn ${s.saveData}`}
				variants='fill'
			>
				{isClick ? 'Сохранено' : 'Сохранить'}
			</ButtonUi>
		</div>
	)
}
