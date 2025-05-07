import ModelViewer from '@components/Model/Model'
import s from './show-info.module.scss'

interface ShowInfoProps {
	latitude: number
	longitude: number
}
export const ShowInfo = ({ latitude, longitude }: ShowInfoProps) => {
	return (
		<div className={s.showInfo}>
			<p className={s.showInfo_p}>
				Your current position: <span>{latitude}</span>
				<span>{longitude}</span>
			</p>

			<div className={s.canvasContainer}>
				<ModelViewer />
			</div>
		</div>
	)
}
