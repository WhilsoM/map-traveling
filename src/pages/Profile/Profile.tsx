import { signOut } from 'firebase/auth'
import { ref as dbRef, get, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'

import { auth, db } from '@api/firebase'
import { ButtonUi, InputUi } from '@ui/index'
import { AvatarUploader } from './AvatarUploader/AvatarUploader'

import s from './profile.module.scss'

interface UserData {
	name: string
	surname: string
	email: string
	phone: string
	profile_picture: string
}

export const Profile = () => {
	const [user] = useAuthState(auth)
	const [userData, setUserData] = useState<UserData>({
		name: '',
		surname: '',
		email: '',
		phone: '',
		profile_picture: '',
	})
	const [avatar, setAvatar] = useState('')
	const [avatarFile, setAvatarFile] = useState<File | null>(null)
	const [error, setError] = useState('')
	const [isSaved, setIsSaved] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (user?.uid) loadUserData(user.uid)
	}, [user])

	const loadUserData = async (uid: string) => {
		try {
			const snapshot = await get(dbRef(db, `users/${uid}`))
			if (snapshot.exists()) {
				const data = snapshot.val() as UserData
				setUserData(data)
				setAvatar(data.profile_picture || '')
			}
		} catch (e: any) {
			setError('Не удалось загрузить данные')
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user) return

		try {
			let avatarUrl = userData.profile_picture

			if (avatarFile) {
				avatarUrl = await uploadAvatar(user.uid, avatarFile)
			}

			const updatedData = { ...userData, profile_picture: avatarUrl }

			await set(dbRef(db, `users/${user.uid}`), updatedData)
			setIsSaved(true)
			setTimeout(() => setIsSaved(false), 2000)
		} catch (e: any) {
			setError('Ошибка при сохранении данных')
		}
	}

	const uploadAvatar = async (uid: string, file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = async () => {
				const base64 = reader.result as string
				await set(dbRef(db, `users/${uid}/avatar`), {
					image: base64,
					timestamp: Date.now(),
				})
				resolve(base64)
			}
			reader.onerror = () => reject(new Error('Ошибка чтения файла'))
		})
	}

	const compressImage = (file: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = (event) => {
				const img = new Image()
				img.src = event.target?.result as string
				img.onload = () => {
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')!
					const MAX = 300
					let { width, height } = img
					if (width > height && width > MAX) {
						height *= MAX / width
						width = MAX
					} else if (height > MAX) {
						width *= MAX / height
						height = MAX
					}
					canvas.width = width
					canvas.height = height
					ctx.drawImage(img, 0, 0, width, height)
					resolve(canvas.toDataURL('image/jpeg', 0.7))
				}
			}
		})
	}

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file || !user) return

		const compressed = await compressImage(file)
		setAvatar(compressed)
		setAvatarFile(file)
	}

	const handleLogout = () => {
		signOut(auth).then(() => navigate('/auth/register'))
	}

	return (
		<div className={`container ${s.profile}`}>
			<h2 className='section-title tac'>Настройки Аккаунта</h2>

			<AvatarUploader avatar={avatar} onChange={handleUpload} />

			<form onSubmit={handleSubmit} className={s.profile__form}>
				<label className='label' htmlFor='name'>
					Имя
				</label>
				<InputUi
					id='name'
					name='name'
					value={userData.name}
					onChange={handleChange}
					type='text'
					className='input'
					variants='outlined'
				/>

				<label className='label' htmlFor='surname'>
					Фамилия
				</label>
				<InputUi
					id='surname'
					name='surname'
					value={userData.surname}
					onChange={handleChange}
					type='text'
					className='input'
					variants='outlined'
				/>

				<label className='label' htmlFor='phone'>
					Телефон
				</label>
				<InputUi
					id='phone'
					name='phone'
					value={userData.phone}
					onChange={handleChange}
					type='text'
					className='input'
					variants='outlined'
				/>

				<label className='label' htmlFor='email'>
					Email
				</label>
				<InputUi
					id='email'
					name='email'
					value={userData.email}
					onChange={handleChange}
					type='email'
					className='input'
					variants='outlined'
				/>

				{error && <p className='error'>{error}</p>}

				<ButtonUi className={`btn ${s.saveData}`} variants='fill' type='submit'>
					{isSaved ? 'Сохранено' : 'Сохранить'}
				</ButtonUi>
			</form>

			<ButtonUi onClick={handleLogout} className={s.logout}>
				Выйти из аккаунта
			</ButtonUi>
		</div>
	)
}
