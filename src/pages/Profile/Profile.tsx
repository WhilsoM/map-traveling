import { signOut } from 'firebase/auth'
import { ref as dbRef, get, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'

import { auth, db } from '@api/firebase'
import { ButtonUi, InputUi } from '@ui/index'
import { AvatarUploader } from './AvatarUploader/AvatarUploader'

import { MoonIcon } from '@assets/icons/Ui/MoonIcon'
import { SunIcon } from '@assets/icons/Ui/SunIcon'
import { useThemeToggle } from '@shared/hooks/useThemeToggle'
import { useTranslation } from 'react-i18next'
import { LangSwitcher } from './LangSwitcher/LangSwitcher'
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
		email: user?.email ?? '',
		phone: user?.phoneNumber ?? '',
		profile_picture: '',
	})
	const [avatar, setAvatar] = useState('')
	const [avatarFile, setAvatarFile] = useState<File | null>(null)
	const [error, setError] = useState('')
	const [isSaved, setIsSaved] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isDarkTheme, setIsDarkTheme] = useState(false)
	const navigate = useNavigate()
	const { t } = useTranslation()

	useEffect(() => {
		if (user?.uid) loadUserData(user.uid)
	}, [user])

	const loadUserData = async (uid: string) => {
		try {
			setIsLoading(true)
			const snapshot = await get(dbRef(db, `users/${uid}`))

			if (snapshot.exists()) {
				const data = snapshot.val() as UserData

				setUserData(data)
				setAvatar(data.profile_picture || '')
			}
		} catch (e: any) {
			setError(t('profile.errorloaddata'))
		} finally {
			setIsLoading(false)
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
			setIsLoading(true)
			let avatarUrl = userData.profile_picture

			if (avatarFile) {
				avatarUrl = await uploadAvatar(user.uid, avatarFile)
			}

			const updatedData = { ...userData, profile_picture: avatarUrl }

			await set(dbRef(db, `users/${user.uid}`), updatedData)
			setIsSaved(true)
			setTimeout(() => setIsSaved(false), 2000)
		} catch (e: any) {
			setError(t('profile.errorsavedata'))
		} finally {
			setIsLoading(false)
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
			<h2 className='section-title tac'>{t('profile.title')}</h2>

			<AvatarUploader avatar={avatar} onChange={handleUpload} />

			<form onSubmit={handleSubmit} className={s.profile__form}>
				<label className='label' htmlFor='name'>
					{t('name')}
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
					{t('surname')}
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
					{t('phone')}
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
					{t('email')}
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
					{isSaved ? t('profile.saved') : t('profile.save')}{' '}
					{isLoading ? ` : ${t('loading')}` : ''}
				</ButtonUi>
			</form>

			<ButtonUi onClick={handleLogout} className={s.logout}>
				{t('profile.logout')}
			</ButtonUi>

			<h2 className='section-title'>{t('profile.chooselan')}</h2>

			<div className={s.wrapperLangTheme}>
				<LangSwitcher />

				<ButtonUi
					onClick={() => {
						useThemeToggle()
						setIsDarkTheme((prev) => !prev)
					}}
				>
					{isDarkTheme ? (
						<MoonIcon size={22} color='white' />
					) : (
						<SunIcon size={22} color='white' />
					)}
				</ButtonUi>
			</div>
		</div>
	)
}
