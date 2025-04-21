import { InputUi } from '@shared/ui'
import s from '../choose-auth.module.scss'
import { PhoneProps } from '../types'

export const PhoneAuth = ({ phone, setPhone }: PhoneProps) => {
	return (
		<>
			<label className={s.label} htmlFor='phoneNumber'>
				Номер телефона
			</label>
			<InputUi
				className={s.input}
				type='tel'
				id='phoneNumber'
				variants='outlined'
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
		</>
	)
}
