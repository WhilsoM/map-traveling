import React, { forwardRef } from 'react'

interface InputUiProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id?: string
	variants: 'outlined' | 'form' | 'file'
	placeholder?: string
	value?: string
	className?: string
	min?: number
	max?: number
	maxLength?: number
	name?: string
}

export const InputUi = forwardRef<HTMLInputElement, InputUiProps>(
	(
		{
			type,
			id,
			variants,
			placeholder,
			onChange,
			value,
			className,
			min,
			max,
			maxLength,
			name,
			...props
		},
		ref
	) => {
		return (
			<input
				ref={ref}
				value={value}
				onChange={onChange}
				type={type}
				id={id}
				className={`${variants} ${className}`}
				placeholder={placeholder}
				min={min}
				max={max}
				maxLength={maxLength}
				name={name}
				{...props}
			/>
		)
	}
)
