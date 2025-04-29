interface InputUiProps {
	type: 'email' | 'password' | 'text' | 'tel' | 'number' | 'file'
	id?: string
	variants: 'outlined'
	placeholder?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	className?: string
	min?: number
	max?: number
	maxLength?: number
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void
	Ref?: any
	name?: string
	inputMode?:
		| 'email'
		| 'text'
		| 'tel'
		| 'search'
		| 'url'
		| 'none'
		| 'numeric'
		| 'decimal'
}

export const InputUi = ({
	type,
	id,
	variants,
	placeholder,
	onChange,
	value,
	className,
	min,
	max,
	Ref,
	maxLength,
	inputMode,
	onKeyDown,
	name,
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
			min={min}
			max={max}
			maxLength={maxLength}
			inputMode={inputMode}
			onKeyDown={() => onKeyDown}
			ref={Ref}
			name={name}
			{...props}
		/>
	)
}
