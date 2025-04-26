import { auth } from '@api/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export const Home = () => {
	const [user] = useAuthState(auth)

	return <div>hellk</div>
}
