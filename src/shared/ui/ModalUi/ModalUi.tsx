import { ReactNode } from 'react'

export interface ModalUiProps {
	setIsOpenModal: any
	className?: string
	children: ReactNode
}

export const ModalUi = ({
	setIsOpenModal,
	children,
	className,
}: ModalUiProps) => {
	return (
		<div
			className={`overlay`}
			role='modal'
			onClick={() => setIsOpenModal(false)}
		>
			<div
				className={`modal__content ${className}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}
