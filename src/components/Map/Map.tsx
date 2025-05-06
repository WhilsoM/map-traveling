import { ShowInfo } from '@components/ShowInfo/ShowInfo'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { ModalUi } from '@ui/index'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import s from './map.module.scss'

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
				className={s.map}
			>
				<Placemark
					options={{
						iconColor: 'black',
					}}
					geometry={[position.latitude, position.longitude]}
					onClick={() => setIsOpen((prev) => !prev)}
				/>

				{isOpen && (
					<ModalUi setIsOpenModal={setIsOpen}>
						<ShowInfo
							latitude={position.latitude}
							longitude={position.longitude}
						/>
					</ModalUi>
				)}
			</Map>
		</YMaps>
	)
}
