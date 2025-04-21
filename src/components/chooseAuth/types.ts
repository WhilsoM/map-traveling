import { Dispatch, SetStateAction } from 'react'

export interface EmailProps {
	email: string
	setEmail: Dispatch<SetStateAction<string>>
	password: string
	setPassword: Dispatch<SetStateAction<string>>
}

export interface PhoneProps {
	phone: string
	setPhone: Dispatch<SetStateAction<string>>
}
