import { auth } from '@api/firebase'
import catLoader from '@assets/animations/cat.json'
import Lottie from 'lottie-react'
import { type ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
	children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const [user, loading] = useAuthState(auth)

	if (loading)
		return (
			<div className='loader'>
				<Lottie animationData={catLoader} loop />
				<p>Загрузка...</p>
			</div>
		)

	return user ? children : <Navigate to={'/auth/register'} />
}
