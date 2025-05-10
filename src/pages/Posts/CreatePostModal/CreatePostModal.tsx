import { auth } from '@api/firebase'
import { BoldIcon } from '@assets/icons/Ui/BoldIcon'
import { ImgIcon } from '@assets/icons/Ui/ImgIcon'
import { ItalicIcon } from '@assets/icons/Ui/ItalicIcon'
import { ButtonUi, InputUi } from '@ui/index'
import { ModalUi, ModalUiProps } from '@ui/ModalUi/ModalUi'
import DOMPurify from 'dompurify'
import {
	type ChangeEvent,
	FormEvent,
	MouseEvent,
	useRef,
	useState,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useTranslation } from 'react-i18next'
import s from '../posts.module.scss'
type CreatePostModalProps = Omit<ModalUiProps, 'children'>

export const CreatePostModal = ({ setIsOpenModal }: CreatePostModalProps) => {
	const user = useAuthState(auth)
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [error, setError] = useState({ error: false, message: '' })
	const imgRef = useRef<HTMLImageElement>(null)
	const fileRef = useRef<HTMLInputElement>(null)
	const firstInputRef = useRef<HTMLInputElement>(null)
	const secondInputRef = useRef<HTMLInputElement>(null)
	const infoRef = useRef<HTMLDivElement>(null)
	const { t } = useTranslation()

	const emailUser = user[0]?.email
	const author =
		emailUser !== null || emailUser !== undefined ? emailUser : 'anonymus'

	//показываем картинку
	const previewFile = () => {
		const file = fileRef.current?.files?.[0]
		if (!file || !imgRef.current) return

		const reader = new FileReader()
		reader.onloadend = () => {
			const img = new Image()
			img.onload = () => {
				const canvas = document.createElement('canvas')
				const MAX_WIDTH = 600
				const scaleSize = MAX_WIDTH / img.width
				canvas.width = MAX_WIDTH
				canvas.height = img.height * scaleSize

				const ctx = canvas.getContext('2d')
				ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
				const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7)

				imgRef.current!.src = compressedDataUrl
			}
			if (typeof reader.result === 'string') {
				img.src = reader.result
			}
		}
		reader.readAsDataURL(file)
	}

	const cleanHTML = (html: string) => {
		return DOMPurify.sanitize(html, {
			ALLOWED_TAGS: ['b', 'strong', 'i', 'u', 'em'],
		})
	}
	const createPost = async (e: FormEvent<HTMLFormElement>) => {
		checkValidation()

		if (error.error || error.message.length < 1) {
			return console.log('error', error.error)
		}

		const payload = {
			country,
			city,
			dateFrom: firstInputRef.current?.value,
			dateTo: secondInputRef.current?.value,
			info: cleanHTML(infoRef.current?.innerHTML || ''),
			author: author,
			img: imgRef.current?.src,
		}

		try {
			const res = await fetch(`${import.meta.env.VITE_API}api/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (!res.ok || res.status === 400) {
				return setError({ error: true, message: t('posts.fields') })
			}
			setIsOpenModal(false)
		} catch (error: any) {
			console.log('error', error)

			setError({ error: true, message: error.message })
		}
		location.reload()
		const { toast } = await import('react-toast')

		toast(t('posts.successpostcreate'), {
			backgroundColor: '#323131',
			color: '#ffffff',
		})
	}

	const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
		const inpValue = input.target.value

		if (!inpValue) return

		if (!/^\d+$/.test(inpValue)) {
			setError({
				error: true,
				message: t('posts.errordata'),
			})
		} else {
			setError({
				error: false,
				message: '',
			})
		}
	}
	// put the function in the folder utils/
	const checkValidation = () => {
		const firstValue = firstInputRef.current
		const secondValue = secondInputRef.current
		const MIN_LENGTH = 3
		console.log(country.length < MIN_LENGTH || !country)
		console.log(city.length < MIN_LENGTH || !city)

		if (country.length < MIN_LENGTH || !country) {
			setError({
				error: true,
				message: t('posts.fieldneedwrite', { field: t('posts.country') }),
			})
			return
		}
		if (city.length < MIN_LENGTH || !city) {
			setError({
				error: true,
				message: t('posts.fieldneedwrite', { field: t('posts.city') }),
			})
			return
		}
		if (
			(firstValue && firstValue.value.length < 1) ||
			(secondValue && secondValue.value.length < 1)
		) {
			setError({
				error: true,
				message: 'Заполните даты',
			})
			return
		}

		return setError({ error: false, message: '' })
	}

	const handleCommand = (command: string) => (e: MouseEvent) => {
		e.preventDefault()
		const selection = window.getSelection()
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)

			if (command === 'bold') {
				const isBold =
					range.startContainer.parentNode?.nodeName === 'B' ||
					range.startContainer.parentNode?.nodeName === 'strong'

				if (isBold) {
					document.execCommand('removeFormat')
				} else {
					const bold = document.createElement('b')

					range.surroundContents(bold)
				}
			}

			if (command === 'italic') {
				const isItalic =
					range.startContainer.parentNode?.nodeName === 'I' ||
					range.startContainer.parentNode?.nodeName === 'EM'

				if (isItalic) {
					document.execCommand('removeFormat')
				} else {
					const italic = document.createElement('i')
					range.surroundContents(italic)
				}
			}
		}
	}

	return (
		<ModalUi className={s.createPostModal} setIsOpenModal={setIsOpenModal}>
			<form onSubmit={(e) => createPost(e)}>
				<div>
					<label className={s['input-file']}>
						<img ref={imgRef} width={'100%'} height={'200px'} />
						<InputUi
							ref={fileRef}
							onChange={previewFile}
							variants='file'
							type='file'
							name='file'
						/>
						<span className={s.textUploadImg}>
							<ImgIcon /> <span>{t('posts.uploadimg')}</span>
						</span>
					</label>
				</div>

				<h2 className='section-title'> {t('posts.title')} </h2>

				<label className='label'>
					{t('posts.country')}
					<InputUi
						variants='outlined'
						type='text'
						placeholder={t('posts.country')}
						className={`input ${s.country_input}`}
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</label>

				<label className='label'>
					{t('posts.city')}

					<InputUi
						variants='outlined'
						type='text'
						placeholder={t('posts.city')}
						className={`input ${s.city_input}`}
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</label>

				<div className={s.date_travel}>
					<p className={s.date_travel_text}> {t('posts.datetravel')} </p>

					<div className={s.date_travel_wrapper}>
						<div className={s.date_travel_block}>
							<span> {t('posts.vacationfrom')} </span>
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
							<span>{t('posts.vacationTo')}</span>
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
				<div>
					<div className={s.editorBtns}>
						<ButtonUi onMouseDown={handleCommand('bold')} type='button'>
							<BoldIcon color='white' size={15} />
						</ButtonUi>
						<ButtonUi onMouseDown={handleCommand('italic')} type='button'>
							<ItalicIcon color='white' size={15} />
						</ButtonUi>
					</div>

					<div
						contentEditable
						suppressContentEditableWarning
						ref={infoRef}
						className={s.textInfo}
						id='textarea'
						tabIndex={0}
					></div>
				</div>

				{error.error && <p className='error'>{error.message}</p>}
				<ButtonUi
					className={`btn ${s.createPostBtn}`}
					variants='fill'
					type='submit'
				>
					{t('posts.create')}
				</ButtonUi>
			</form>
		</ModalUi>
	)
}
