import { ButtonUi, InputUi } from '@ui/index'
import { ModalUi, ModalUiProps } from '@ui/ModalUi/ModalUi'
import { useRef, useState } from 'react'
import s from '../posts.module.scss'
type CreatePostModalProps = Omit<ModalUiProps, 'children'>

export const CreatePostModal = ({
	isOpenModal,
	setIsOpenModal,
}: CreatePostModalProps) => {
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [error, setError] = useState({ error: false, message: '' })
	const firstInputRef = useRef<HTMLInputElement>(null)
	const secondInputRef = useRef<HTMLInputElement>(null)

	const createPost = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		checkValidation()

		if (error.error) return

		console.log('все гуд')
	}

	const handleChange = () => {
		const firstInpValue = firstInputRef.current?.value

		if (!firstInpValue) return

		if (!/^\d+$/.test(firstInpValue)) {
			setError({
				error: true,
				message: 'Должны быть только цифры или неправильно указана дата ',
			})
		} else {
			setError({
				error: false,
				message: '',
			})
		}
	}

	const checkValidation = () => {
		const MIN_LENGTH = 3

		if (country.length < MIN_LENGTH || !country) {
			return setError({ error: true, message: 'Заполните поле "страна"' })
		}
		if (city.length < MIN_LENGTH || !city) {
			return setError({ error: true, message: 'Заполните поле "город"' })
		}

		return
	}

	return (
		<ModalUi isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
			<form onSubmit={(e) => createPost(e)}>
				<div>
					<InputUi type='file' variants='file' />
				</div>

				<h2 className='section-title '>Добавления путешествия</h2>

				<label htmlFor='country' className='label'>
					Страна
				</label>
				<InputUi
					id='country'
					variants='outlined'
					type='text'
					placeholder='Введите страну'
					className={`input ${s.country_input}`}
				/>

				<label htmlFor='city' className='label'>
					Город
				</label>
				<InputUi
					id='city'
					variants='outlined'
					type='text'
					placeholder='Введите город'
					className={`input ${s.city_input}`}
				/>

				<div className={s.date_travel}>
					<p className={s.date_travel_text}>Дата поездки</p>

					<div className={s.date_travel_wrapper}>
						<div className={s.date_travel_block}>
							<span>с</span>
							<InputUi
								type='text'
								variants='form'
								className={s.date_travel_input}
								min={1}
								max={31}
								maxLength={2}
								ref={firstInputRef}
								onChange={handleChange}
							/>
						</div>

						<div className={s.date_travel_block}>
							<span>по</span>
							<InputUi
								type='text'
								variants='form'
								className={s.date_travel_input}
								min={1}
								max={31}
								maxLength={2}
								ref={secondInputRef}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>

				{error.error && <p className='error'>{error.message}</p>}
				<ButtonUi
					className={`btn ${s.createPostBtn}`}
					variants='fill'
					type='submit'
				>
					Создать пост
				</ButtonUi>
			</form>
		</ModalUi>
	)
}
