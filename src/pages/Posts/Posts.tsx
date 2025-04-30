import { ButtonUi } from '@ui/index'
import { useState } from 'react'
import { CreatePostModal } from './CreatePostModal/CreatePostModal'
import { Post } from './Post/Post'
import s from './posts.module.scss'

export const Posts = () => {
	const [posts, setPosts] = useState([{ key: 'd' }, { key: '' }])
	const [isOpenModal, setIsOpenModal] = useState(false)

	return (
		<div className={`container ${s.posts}`}>
			<h2 className={`section-title tac`}>Ваши публикации</h2>

			{posts.length === 0 ? (
				<p className={s.emptyPosts}>Постов нету :)</p>
			) : (
				posts.map((el) => <Post key={el.key} />)
			)}

			<ButtonUi
				onClick={() => setIsOpenModal(true)}
				type='button'
				variants='fill'
			>
				Создать пост
			</ButtonUi>

			{isOpenModal && (
				<CreatePostModal
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
				/>
			)}
		</div>
	)
}
