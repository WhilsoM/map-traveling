interface ButtonUiProps {
	type: 'submit' | 'button'
	variants?: 'fill'
	children: React.ReactNode
	onClick?: () => void
}

export const ButtonUi = ({
	type,
	variants,
	children,
	onClick,
}: ButtonUiProps) => {
	return (
		<button onClick={onClick} type={type}>
			{children}
		</button>
	)
}
