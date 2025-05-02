import { ButtonUi } from '@ui/index'
import { useEffect, useState } from 'react'
import { CreatePostModal } from './CreatePostModal/CreatePostModal'
import { Post } from './Post/Post'
import s from './posts.module.scss'

export const Posts = () => {
	const [posts, setPosts] = useState([{ key: 'd' }, { key: '' }])
	const [isOpenModal, setIsOpenModal] = useState(false)

	useEffect(() => {
		fetchPosts()
	}, [])

	const fetchPosts = async () => {
		try {
			const response = await fetch('/api/express_backend')
			const data = await response.json()

			console.log(data)
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
					posts.map((el) => <Post key={el.key} />)
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
