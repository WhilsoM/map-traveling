import { ButtonUi, InputUi } from '@ui/index'
import { ModalUi, ModalUiProps } from '@ui/ModalUi/ModalUi'
import { ChangeEvent, useRef, useState } from 'react'
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

	const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		checkValidation()

		if (error.error) return

		const payload = {
			country,
			city,
			dateFrom: secondInputRef.current?.value,
			dateTo: firstInputRef.current?.value,
		}

		try {
			const res = await fetch('/api/create-post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})
			if (!res.ok || res.status === 400) {
				return setError({ error: true, message: 'Заполните все поля' })
			}
			const data = await res.json()
			console.log(data)
		} catch (error: any) {
			console.log('error', error)

			setError({ error: true, message: error.message })
		}
	}

	const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
		const inpValue = input.target.value

		if (!inpValue) return

		if (!/^\d+$/.test(inpValue)) {
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

		return setError({ error: false, message: '' })
	}

	return (
		<ModalUi isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
			<form onSubmit={(e) => createPost(e)}>
				<div>
					<InputUi type='file' variants='file' />
				</div>

				<h2 className='section-title '>Добавления путешествия</h2>

				<label className='label'>
					Страна
					<InputUi
						variants='outlined'
						type='text'
						placeholder='Введите страну'
						className={`input ${s.country_input}`}
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</label>

				<label className='label'>
					Город
					<InputUi
						variants='outlined'
						type='text'
						placeholder='Введите город'
						className={`input ${s.city_input}`}
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</label>

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
								onChange={(e) => handleChange(e)}
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
								onChange={(e) => handleChange(e)}
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
