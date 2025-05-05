interface ShowInfoProps {
	latitude: number
	longitude: number
}
export const ShowInfo = ({ latitude, longitude }: ShowInfoProps) => {
	return (
		<div>
			Your current position: {latitude},{longitude}
		</div>
	)
}
