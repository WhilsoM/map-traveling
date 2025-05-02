import { BottomSheet } from '@components/BottomSheet/BottomSheet'
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute'
import { Outlet } from 'react-router'

export const Layout = () => {
	return (
		<ProtectedRoute>
			<main>
				<Outlet />
			</main>
			<BottomSheet />
		</ProtectedRoute>
	)
}
