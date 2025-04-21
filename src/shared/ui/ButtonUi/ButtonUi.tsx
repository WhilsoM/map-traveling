interface ButtonUiProps {
	type?: 'submit' | 'button'
	variants?: 'fill' | 'outlined'
	children: React.ReactNode
	onClick?: () => void
	className?: string
}

export const ButtonUi = ({
	type = 'button',
	variants = 'fill',
	children,
	onClick,
	className,
	...props
}: ButtonUiProps) => {
	return (
		<button
			className={`btn ${variants} ${className}`}
			onClick={onClick}
			type={type}
			{...props}
		>
			{children}
		</button>
	)
}
