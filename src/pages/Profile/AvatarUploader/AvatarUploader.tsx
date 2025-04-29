import { useRef } from 'react'
import s from './avatar-uploader.module.scss'

interface AvatarUploaderProps {
	avatar: string
	onChange: any
}

export const AvatarUploader = ({ avatar, onChange }: AvatarUploaderProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null)

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
		</div>
	)
}
