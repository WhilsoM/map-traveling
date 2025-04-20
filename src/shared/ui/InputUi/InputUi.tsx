interface InputUiProps {
	type: 'email' | 'password' | 'text'
	id: string
	variants: 'outlined'
	placeholder?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
}

export const InputUi = ({
	type,
	id,
	variants,
	placeholder,
	onChange,
	value,
}: InputUiProps) => {
	return (
		<input
			value={value}
			onChange={onChange}
			type={type}
			id={id}
			className={variants}
			placeholder={placeholder}
		/>
	)
}
