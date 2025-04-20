import { InputUi } from '../../../shared/ui/InputUi/InputUi'

export const SignUp = () => {
	return (
		<div className='container container-wrapper'>
			<h1>Регистрация</h1>

			<form method='post'>
				<label htmlFor='name'>Имя</label>
				<InputUi type='text' id='name' variants='outlined' />

				<label htmlFor='surname'>Фамилия</label>
				<InputUi type='text' id='surname' variants='outlined' />

				{/* CHANGE TO COMPONENT USER CAN CHOOSE PHONE OR EMAIL */}
				<label htmlFor='phoneNumber'>Номер телефона</label>
				<InputUi type='text' id='phoneNumber' variants='outlined' />

				<button type='submit'>Зарегистрироваться</button>
				{/* SPAN change to link */}
				<p>
					Нажимая кнопку Зарегистрироваться вы соглашаетесь с{' '}
					<span>Политикой конфиденциальности</span>
				</p>
			</form>
		</div>
	)
}
