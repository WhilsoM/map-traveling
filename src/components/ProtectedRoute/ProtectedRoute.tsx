import { auth } from '@api/firebase'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
	children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const [user, loading] = useAuthState(auth)

	if (loading) return <div>Загрузка...</div>

	return user ? children : <Navigate to={'/auth/register'} />
}
