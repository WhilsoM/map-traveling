import { auth } from '@api/firebase'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Outlet, useNavigate } from 'react-router'

export const AuthLayout = () => {
	const [user] = useAuthState(auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			navigate('/page/home')
		}
	}, [user, navigate])

	return !user && <Outlet />
}
