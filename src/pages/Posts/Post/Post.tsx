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
	return (
		<article className={s.post}>
			<div className={s.post__wrapper_img}>
				{img && (
					<img
						src={img}
						alt={`Картинка с города ${city}`}
						width={500}
						height={'auto'}
					/>
				)}
			</div>

			<div className={s.post__wrapper_info}>
				<div className={s.infoUser}>
					<p>{author}</p>
				</div>

				<div className={s.where}>
					<p>
						<span>
							Страна: <span>{country ?? 'Страна не указана'}</span>
						</span>
						<span>
							Город: <span>{city ?? 'Город не указан'}</span>
						</span>
					</p>
					<p>
						Отдыхал с <span>{dateFrom ?? 'с какого периода не указано'}</span>{' '}
						по <span>{dateTo ?? 'до какого периода не указано'}</span>{' '}
					</p>
				</div>

				<div className={s.travel_about}>
					<p>{info ?? 'Заметка не указана'}</p>
				</div>
			</div>
		</article>
	)
}
