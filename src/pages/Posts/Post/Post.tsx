import { ModalUi } from '@ui/index'
import DOMPurify from 'dompurify'
import { useState } from 'react'
import { PostsProps } from '../Posts'
import s from '../posts.module.scss'

type PostProps = Omit<PostsProps, 'id' | 'phoneNumber'>

export const Post = ({
	img,
	city,
	country,
	dateFrom,
	dateTo,
	info,
	author,
}: PostProps) => {
	const cleanHTML = DOMPurify.sanitize(info)
	const [isOpenFullImg, setIsOpenFullImg] = useState(false)

	return (
		<article className={s.post}>
			<div className={s.post__wrapper_img}>
				{img && (
					<img
						onClick={() => setIsOpenFullImg(true)}
						className={s.postImg}
						src={img}
						alt={`Картинка с города ${city}`}
						width={500}
						height={'auto'}
					/>
				)}
				{isOpenFullImg && (
					<ModalUi setIsOpenModal={setIsOpenFullImg}>
						<img
							onClick={() => setIsOpenFullImg(false)}
							className={s.postImg}
							src={img}
							alt={`Картинка с города ${city}`}
							width={1000}
							height={'auto'}
						/>
					</ModalUi>
				)}
			</div>

			<div className={s.post__wrapper_info}>
				<div className={s.infoUser}>
					<p>{author}</p>
				</div>

				<div className={s.where}>
					<p>
						<span>
							Страна: <span>{country}</span>
						</span>
						<span>
							Город: <span>{city}</span>
						</span>
					</p>
					<p>
						с <span>{dateFrom}</span> по <span>{dateTo}</span>{' '}
					</p>
				</div>

				<div className={s.travel_about}>
					<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
				</div>
			</div>
		</article>
	)
}
