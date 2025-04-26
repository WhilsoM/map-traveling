import { auth } from '@api/firebase'

import { MapComponent } from '@components/Map/Map'
import { useAuthState } from 'react-firebase-hooks/auth'

export const Home = () => {
	const [user] = useAuthState(auth)

	return (
		<>
			<MapComponent />
		</>
	)
}
