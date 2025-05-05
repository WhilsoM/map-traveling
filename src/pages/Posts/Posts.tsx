import { useWebSocket } from '@shared/hooks/useWebSocket'
import { ButtonUi } from '@ui/index'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
	id: number
	author: string
}

export enum SocketEventType {
	NewPost = 'new_post',
	DeletePost = 'delete_post',
	UpdatePost = 'update_post',
}

export const Posts = () => {
	const [posts, setPosts] = useState<PostsProps[]>([])
	const [isOpenModal, setIsOpenModal] = useState(false)
	const { t } = useTranslation()

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		try {
			const response = await fetch(`/api/posts`)
			const data = await response.json()

			setPosts(data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleMessage = useCallback((message: { type: string; data: any }) => {
		if (message.type === SocketEventType.NewPost) {
			setPosts((prev) => [message.data, ...prev])
		}
	}, [])

	useWebSocket(handleMessage)

	return (
		<div className={`container ${s.posts}`}>
			<h2 className={`section-title tac`}>{t('posts.title')}</h2>
			<div className={s.btnCreatePost}>
				<ButtonUi
					onClick={() => setIsOpenModal(true)}
					type='button'
					variants='fill'
					className={s.createNewPostBtn}
				>
					{t('posts.create')}
				</ButtonUi>
			</div>

			<section className={s.posts__wrapper}>
				{posts.length === 0 ? (
					<p className={s.emptyPosts}>Постов нету</p>
				) : (
					posts.map((el) => (
						<Post
							key={el.id}
							city={el.city}
							country={el.country}
							dateFrom={el.dateFrom}
							dateTo={el.dateTo}
							info={el.info}
							img={el.img}
							author={el.author}
						/>
					))
				)}
			</section>

			{isOpenModal && <CreatePostModal setIsOpenModal={setIsOpenModal} />}
		</div>
	)
}
