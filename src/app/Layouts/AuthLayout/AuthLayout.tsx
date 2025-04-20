import { auth } from '@api/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Outlet, useNavigate } from 'react-router'

export const AuthLayout = () => {
	const [user] = useAuthState(auth)
	const navigate = useNavigate()

	return (
		<>
			{user && navigate('/home')}
			{!user && <Outlet />}
		</>
	)
}
