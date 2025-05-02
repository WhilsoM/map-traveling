import { PostsProps } from '../Posts'
import s from '../posts.module.scss'

type PostProps = PostsProps

export const Post = ({
	img,
	city,
	country,
	dateFrom,
	dateTo,
	info,
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
						Отдыхал с <span>{dateFrom}</span> по <span>{dateTo}</span>{' '}
					</p>
				</div>

				<div className={s.travel_about}>
					<p>{info}</p>
				</div>
			</div>
		</article>
	)
}
