import { auth } from '@api/firebase'
import { ButtonUi, InputUi } from '@ui/index'
import { ModalUi, ModalUiProps } from '@ui/ModalUi/ModalUi'
import { ChangeEvent, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import s from '../posts.module.scss'

type CreatePostModalProps = Omit<ModalUiProps, 'children'>

export const CreatePostModal = ({
	isOpenModal,
	setIsOpenModal,
}: CreatePostModalProps) => {
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [error, setError] = useState({ error: false, message: '' })
	const user = useAuthState(auth)
	const imgRef = useRef<HTMLInputElement>(null)
	const firstInputRef = useRef<HTMLInputElement>(null)
	const secondInputRef = useRef<HTMLInputElement>(null)
	const infoRef = useRef<HTMLTextAreaElement>(null)
	let emailOrPhone
	const haveEmailUser = user[0]?.email
	const havePhoneUser = user[0]?.phoneNumber

	if (haveEmailUser !== null || haveEmailUser !== undefined) {
		emailOrPhone = haveEmailUser
	} else if (havePhoneUser !== null || havePhoneUser !== undefined) {
		emailOrPhone = havePhoneUser
	} else {
		emailOrPhone = 'anonymus'
	}

	const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
		checkValidation()

		if (error.error) {
			return console.log('error', error.error)
		}

		const payload = {
			country,
			city,
			dateFrom: firstInputRef.current?.value,
			dateTo: secondInputRef.current?.value,
			info: infoRef.current?.value,
			author: emailOrPhone,
			img: imgRef.current?.value,
		}

		try {
			const res = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (!res.ok || res.status === 400) {
				return setError({ error: true, message: 'Заполните все поля' })
			}
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
					<InputUi type='file' variants='file' ref={imgRef} />
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

				<textarea ref={infoRef} className={s.textInfo}></textarea>

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
