import { ShowInfo } from '@components/ShowInfo/ShowInfo'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const MapComponent = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [position, setPosition] = useState({
		latitude: 55.75,
		longitude: 37.57,
	})
	const { t } = useTranslation()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setPosition({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			})
		})
	}, [])
	console.log(isOpen)

	return (
		<YMaps
			query={{
				apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
				lang: `${t('lang')}`,
			}}
		>
			<Map
				defaultState={{
					center: [position.latitude, position.longitude],
					zoom: 9,
				}}
				width='100%'
				height='100vh'
			>
				<div
					style={{
						width: isOpen ? 300 : 0,
						height: isOpen ? 300 : 0,
					}}
				>
					{isOpen && (
						<ShowInfo
							latitude={position.latitude}
							longitude={position.longitude}
						/>
					)}
					<Placemark
						options={{
							iconColor: 'black',
							openHintOnHover: true,
							openBalloonOnClick: true,
						}}
						geometry={[position.latitude, position.longitude]}
					/>
				</div>
			</Map>
		</YMaps>
	)
}
