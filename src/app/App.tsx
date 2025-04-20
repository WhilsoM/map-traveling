import { CheckAuthUser } from '@components/CheckAuthUser/CheckAuthUser'
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute'
import { Home } from '@pages/Home/Home'
import { PolicySecurity } from '@pages/PolicySecurity/'
import { SignIn, SignUp } from '@pages/Sign'
import { Route, Routes } from 'react-router'
import { AuthLayout } from './Layouts/AuthLayout/AuthLayout'

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<CheckAuthUser />} />

			<Route path='/auth' element={<AuthLayout />}>
				<Route path='register' element={<SignUp />} />
				<Route path='login' element={<SignIn />} />
				<Route path='policy' element={<PolicySecurity />} />
			</Route>

			<Route
				path='/home'
				element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}
