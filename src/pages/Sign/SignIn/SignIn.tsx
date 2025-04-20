import { InputUi } from '../../../shared/ui/InputUi/InputUi'

export const SignIn = () => {
	return (
		<div className='container container-wrapper'>
			<h1>Авторизация</h1>

			<form method='post'>
				{/* CHANGE TO COMPONENT USER CAN CHOOSE PHONE OR EMAIL */}
				<label htmlFor='phoneNumber'>Номер телефона</label>
				<InputUi type='text' id='phoneNumber' variants='outlined' />

				<button type='submit'>Авторизация</button>
			</form>
		</div>
	)
}
