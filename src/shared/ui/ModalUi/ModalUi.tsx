import { ReactNode } from 'react'

export interface ModalUiProps {
	setIsOpenModal: any
	isOpenModal: boolean
	children: ReactNode
}

export const ModalUi = ({
	isOpenModal,
	setIsOpenModal,
	children,
}: ModalUiProps) => {
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
