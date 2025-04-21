import { InputUi } from '@ui/index'
import s from '../choose-auth.module.scss'
import { EmailProps } from '../types'

export const EmailAuth = ({
	email,
	setEmail,
	password,
	setPassword,
}: EmailProps) => {
	return (
		<>
			<label className={s.label} htmlFor='email'>
				Почта
			</label>
			<InputUi
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className={s.input}
				id='email'
				variants='outlined'
				type='email'
			/>

			<label className={s.label} htmlFor='password'>
				Пароль
			</label>
			<InputUi
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className={s.input}
				id='password'
				variants='outlined'
				type='password'
			/>
		</>
	)
}
