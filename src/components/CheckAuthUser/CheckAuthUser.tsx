import { auth } from '@api/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const CheckAuthUser = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate('/home')
			} else {
				navigate('/auth/register')
			}
		})

		return () => unsubscribe()
	}, [])

	return <div>Проверка авторизации...</div>
}
