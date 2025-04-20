interface InputUiProps {
	type: string
	id: string
	variants: 'outlined'
}

export const InputUi = ({ type, id, variants }: InputUiProps) => {
	return <input type={type} id={id} className={variants} />
}
