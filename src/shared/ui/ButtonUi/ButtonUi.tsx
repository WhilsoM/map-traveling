import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonUiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type?: 'submit' | 'button'
	variants?: 'fill' | 'outlined'
	children: ReactNode
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
