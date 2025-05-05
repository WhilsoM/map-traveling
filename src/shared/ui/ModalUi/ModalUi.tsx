import { ReactNode } from 'react'

export interface ModalUiProps {
	setIsOpenModal: any

	children: ReactNode
}

export const ModalUi = ({ setIsOpenModal, children }: ModalUiProps) => {
	return (
		<div
			className={`overlay`}
			role='modal'
			onClick={() => setIsOpenModal(false)}
		>
			<div className={`modal__content`} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}
