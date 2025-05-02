import { ButtonUi } from '@ui/index'
import { useEffect, useState } from 'react'
import { CreatePostModal } from './CreatePostModal/CreatePostModal'
import { Post } from './Post/Post'
import s from './posts.module.scss'

export type PostsProps = {
	img?: string
	city: string
	country: string
	dateFrom: string
	dateTo: string
	info: string
}

export const Posts = () => {
	const [posts, setPosts] = useState<PostsProps[]>([])
	const [isOpenModal, setIsOpenModal] = useState(false)

	useEffect(() => {
		getAllPosts()
	}, [])

	const getAllPosts = async () => {
		try {
			const response = await fetch('/api/posts')
			const data = await response.json()

			console.log(data)
			setPosts(data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={`container ${s.posts}`}>
			<h2 className={`section-title tac`}>Ваши публикации</h2>
			<div className={s.btnCreatePost}>
				<ButtonUi
					onClick={() => setIsOpenModal(true)}
					type='button'
					variants='fill'
					className={s.createNewPostBtn}
				>
					Создать пост
				</ButtonUi>
			</div>

			<section className={s.posts__wrapper}>
				{posts.length === 0 ? (
					<p className={s.emptyPosts}>Постов нету :)</p>
				) : (
					posts.map((el) => (
						<Post
							key={el.city + el.country}
							city={el.city}
							country={el.country}
							dateFrom={el.dateFrom}
							dateTo={el.dateTo}
							info={el.info}
						/>
					))
				)}
			</section>

			{isOpenModal && (
				<CreatePostModal
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
				/>
			)}
		</div>
	)
}
