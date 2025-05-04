import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import s from './avatar-uploader.module.scss'

interface AvatarUploaderProps {
	avatar: string
	onChange: any
}

export const AvatarUploader = ({ avatar, onChange }: AvatarUploaderProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const { t } = useTranslation()
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
					{t('avatar.uploadavatar')}
				</button>
			)}

			{avatar && (
				<div className={s.previewAvatar__wrapper}>
					<img
						className={s.previewAvatar__img}
						src={avatar}
						alt={t('avatar.preview')}
						onClick={handleButtonClick}
						title={t('avatar.tips')}
						aria-label={t('avatar.tips')}
					/>
				</div>
			)}
		</div>
	)
}
