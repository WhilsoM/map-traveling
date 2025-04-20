interface ButtonUiProps {
	type: 'submit' | 'button'
	variants: 'fill'
}

export const ButtonUi = ({ type }: ButtonUiProps) => {
	return <button type={type}></button>
}
