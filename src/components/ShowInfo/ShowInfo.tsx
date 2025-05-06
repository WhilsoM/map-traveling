import s from './show-info.module.scss'

interface ShowInfoProps {
	latitude: number
	longitude: number
}
export const ShowInfo = ({ latitude, longitude }: ShowInfoProps) => {
	return (
		<div className={s.showInfo}>
			Your current position: {latitude},{longitude}
		</div>
	)
}
