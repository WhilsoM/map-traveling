import { BottomSheet } from '@components/BottomSheet/BottomSheet'
import { Outlet } from 'react-router'

export const Layout = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
			<BottomSheet />
		</>
	)
}
