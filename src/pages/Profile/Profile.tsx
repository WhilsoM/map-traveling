import { auth } from '@api/firebase'
import { AvatarUploader } from '@components/AvatarUploader/AvatarUploader'
import { emailRegex, nameRegex, phoneRegex } from '@shared/config/regex'
import { ButtonUi, InputUi } from '@ui/index'
import { getAuth, signOut } from 'firebase/auth'
import { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'

import { onAuthStateChanged, User } from 'firebase/auth'
import { get, getDatabase, ref, set } from 'firebase/database'
import {
	getDownloadURL,
	getStorage,
	ref as storageRef,
	uploadBytes,
} from 'firebase/storage'
import React, { useCallback, useEffect } from 'react'
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
			<h2 className='section-title tac'>Настройки Аккаунта</h2>

			<form onSubmit={(e) => e.preventDefault()} className={s.profile__form}>
				<AvatarUploader />

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

interface UserData {
	name: string
	surname: string
	email: string
	phone: string
	profile_picture: string
}

const ProfileSettings: React.FC = () => {
	const [userData, setUserData] = useState<UserData>({
		name: '',
		surname: '',
		email: '',
		phone: '',
		profile_picture: '',
	})
	const [avatarFile, setAvatarFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const auth = getAuth()
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user)
			if (user) {
				loadUserData(user.uid)
			} else {
				setLoading(false)
			}
		})

		return () => unsubscribe()
	}, [])

	const loadUserData = useCallback(async (uid: string) => {
		setLoading(true)
		setError(null)
		try {
			const db = getDatabase()
			const userRef = ref(db, `users/${uid}`)
			const snapshot = await get(userRef)

			if (snapshot.exists()) {
				setUserData(snapshot.val() as UserData)
			}
		} catch (e: any) {
			setError(e.message)
		} finally {
			setLoading(false)
		}
	}, [])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserData({ ...userData, [name]: value })
	}

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setAvatarFile(e.target.files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError(null)
		setLoading(true)

		try {
			if (!user) {
				throw new Error('User not authenticated.')
			}

			let avatarURL = userData.profile_picture // Start with existing URL

			if (avatarFile) {
				avatarURL = await uploadAvatar(user.uid, avatarFile)
			}

			const updatedUserData: UserData = {
				...userData,
				profile_picture: avatarURL,
			}
			await saveUserData(user.uid, updatedUserData)
			console.log('Profile updated successfully!')
			// Optionally, show a success message
		} catch (e: any) {
			setError(e.message)
		} finally {
			setLoading(false)
		}
	}

	const uploadAvatar = async (userId: string, file: File): Promise<string> => {
		const storage = getStorage()
		const avatarRef = storageRef(storage, `avatars/${userId}/${file.name}`)
		await uploadBytes(avatarRef, file)
		return await getDownloadURL(avatarRef)
	}

	const saveUserData = async (
		userId: string,
		userData: UserData
	): Promise<void> => {
		const db = getDatabase()
		const userRef = ref(db, `users/${userId}`)
		await set(userRef, userData)
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div>
			<h1>Profile Settings</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						id='name'
						name='name'
						value={userData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor='surname'>Surname:</label>
					<input
						type='text'
						id='surname'
						name='surname'
						value={userData.surname}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						value={userData.email}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor='phone'>Phone:</label>
					<input
						type='tel'
						id='phone'
						name='phone'
						value={userData.phone}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor='avatar'>Avatar:</label>
					<input
						type='file'
						id='avatar'
						name='avatar'
						onChange={handleAvatarChange}
					/>
					{userData.profile_picture && (
						<img
							src={userData.profile_picture}
							alt='Avatar'
							style={{ width: '50px', height: '50px' }}
						/>
					)}
				</div>
				<button type='submit' disabled={loading}>
					Save Changes
				</button>
			</form>
		</div>
	)
}

export default ProfileSettings
