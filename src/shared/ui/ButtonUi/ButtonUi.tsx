interface ButtonUiProps {
	type?: 'submit' | 'button'
	variants?: 'fill' | 'outlined'
	children: React.ReactNode
	onClick?: () => void
	className?: string
	form?: string
	disabled?: boolean
}

export const ButtonUi = ({
	type = 'button',
	variants = 'fill',
	children,
	onClick,
	className,
	form,
	disabled,
	...props
}: ButtonUiProps) => {
	return (
		<button
			form={form}
			className={`btn ${variants} ${className}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	)
}
