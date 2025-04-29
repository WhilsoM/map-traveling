import { useEffect, useRef, useState } from 'react'
import s from './avatar-uploader.module.scss'
export const AvatarUploader = () => {
	const [image, setImage] = useState<null | string>('')
	const [error, setError] = useState('')
	const fileInputRef = useRef<HTMLInputElement>(null)
	const savedAvatar = localStorage.getItem('avatar')

	useEffect(() => {
		setImage(savedAvatar)
	}, [])

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
			setError('Пожалуйста, загрузите изображение в формате JPG или PNG!')
			return
		}
		setError('')

		const imageUrl = URL.createObjectURL(file)

		setImage(imageUrl)
		localStorage.setItem('avatar', imageUrl)
	}
	const handleButtonClick = () => {
		fileInputRef?.current?.click()
	}
	return (
		<div className={s.previewAvatar}>
			<input
				type='file'
				ref={fileInputRef}
				accept='image/jpeg, image/png'
				onChange={handleImageUpload}
				className={s.hiddenInput}
			/>
			{!image && (
				<button className={s.uploadButton} onClick={handleButtonClick}>
					Загрузить аватар
				</button>
			)}

			{image && (
				<div className={s.previewAvatar__wrapper}>
					<img
						className={s.previewAvatar__img}
						src={image}
						alt='Предпросмотр'
						onClick={handleButtonClick}
						title='выбрать аватар'
						aria-label='выбрать аватар'
					/>
				</div>
			)}
			{error && <p className='red-text'>{error}</p>}
		</div>
	)
}
