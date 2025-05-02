import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

export const MapComponent = () => (
	<YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY }}>
		<Map
			// TAKE USERS GEOLOCATION AND PASTE HERE
			defaultState={{ center: [55.75, 37.57], zoom: 9 }}
			width='100%'
			height='100vh'
		>
			<Placemark geometry={[55.75, 37.57]} />
		</Map>
	</YMaps>
)
