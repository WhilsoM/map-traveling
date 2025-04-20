import { auth } from '@api/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export const Home = () => {
	const [user] = useAuthState(auth)
	const emailWithoutDog = user?.email?.replace('@gmail.com', '')

	return (
		<div>
			<h1>Приветствую, {emailWithoutDog}</h1>
		</div>
	)
}
