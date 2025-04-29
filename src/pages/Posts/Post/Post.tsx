import s from '../posts.module.scss'

export const Post = () => {
	return (
		<article className={s.post}>
			<div className={s.post__wrapper_img}>
				<img
					src='https://img.freepik.com/free-photo/friends-sightseeing-old-town_23-2147762281.jpg?t=st=1745922271~exp=1745925871~hmac=ff1a9a64ea001567e350e02fd5275e64507a8c39349b4dd0741a4350e9fd5937&w=900'
					alt='Картинка с путешествия'
					width={500}
					height={'auto'}
				/>
			</div>

			<div className={s.post__wrapper_info}>
				<div className={s.where}>
					<p>
						<span>
							Страна: <span>Россия</span>
						</span>
						<span>
							Город: <span>Москва</span>
						</span>
					</p>
					<p>
						Отдыхал с <span>4</span> по <span>28</span> <span>мая</span>{' '}
					</p>
				</div>

				<div className={s.travel_about}>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
						consequatur aliquid nostrum tempora molestiae beatae expedita dolor,
						aliquam blanditiis dolorem? Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Iste ducimus vel enim doloremque obcaecati fuga
						nesciunt magni delectus inventore hic. Lorem ipsum dolor sit amet,
						consectetur adipisicing elit. Quaerat pariatur nam esse repellendus
						eos perferendis dolor sit iure animi nulla ad sapiente, aperiam
						maiores commodi at, numquam incidunt eligendi dolore rerum, harum
						molestias dicta. Ipsam, possimus! Cumque velit fugiat aut sequi!
						Ipsa totam vitae fuga optio maxime beatae illum sit.
					</p>
				</div>
			</div>
		</article>
	)
}
