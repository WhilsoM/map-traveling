interface InputUiProps {
	type: 'email' | 'password' | 'text' | 'tel'
	id: string
	variants: 'outlined'
	placeholder?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	className?: string
}

export const InputUi = ({
	type,
	id,
	variants,
	placeholder,
	onChange,
	value,
	className,
	...props
}: InputUiProps) => {
	return (
		<input
			value={value}
			onChange={onChange}
			type={type}
			id={id}
			className={`${variants} ${className}`}
			placeholder={placeholder}
			{...props}
		/>
	)
}
