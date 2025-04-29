import { useRef, useState } from 'react'
import s from './avatar-uploader.module.scss'

interface AvatarUploaderProps {
	avatar: string
	onChange: any
	compressImage: any
}

export const AvatarUploader = ({
	avatar,
	onChange,
	compressImage,
}: AvatarUploaderProps) => {
	const [error, setError] = useState('')
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.match('image/(jpeg|png|jpg)')) {
			setError('Допустимы только JPG/PNG изображения!')
			return
		}

		try {
			// Сжимаем изображение перед загрузкой
			const compressedBase64 = await compressImage(file)
			onChange({ target: { files: [file] } }) // Сохраняем файл
			setError('')
		} catch (error) {
			setError('Ошибка обработки изображения')
		}
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
				onChange={onChange}
				className={s.hiddenInput}
			/>
			{!avatar && (
				<button className={s.uploadButton} onClick={handleButtonClick}>
					Загрузить аватар
				</button>
			)}

			{avatar && (
				<div className={s.previewAvatar__wrapper}>
					<img
						className={s.previewAvatar__img}
						src={avatar}
						alt='Предпросмотр'
						onClick={handleButtonClick}
						title='выбрать аватар'
						aria-label='выбрать аватар'
					/>
				</div>
			)}
			{error && <p className='error-text'>{error}</p>}
		</div>
	)
}
