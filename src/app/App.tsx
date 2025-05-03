import { CheckAuthUser } from '@components/CheckAuthUser/CheckAuthUser'

import { Home } from '@pages/Home/Home'
import { PolicySecurity } from '@pages/PolicySecurity/'
import { Posts } from '@pages/Posts/Posts'
import { Profile } from '@pages/Profile/Profile'
import { SignIn, SignUp } from '@pages/Sign'
import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toast'
import { AuthLayout } from './Layouts/AuthLayout/AuthLayout'
import { Layout } from './Layouts/Layout'

export const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<CheckAuthUser />} />

				<Route path='/auth' element={<AuthLayout />}>
					<Route path='register' element={<SignUp />} />
					<Route path='login' element={<SignIn />} />
					<Route path='policy' element={<PolicySecurity />} />
				</Route>

				<Route path='/page' element={<Layout />}>
					<Route path='home' element={<Home />} />
					<Route path='profile-settings' element={<Profile />} />
					<Route path='posts' element={<Posts />} />
				</Route>
			</Routes>
			<ToastContainer delay={3000} />
		</>
	)
}
