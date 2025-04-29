import { useState } from 'react'
import { Post } from './Post/Post'
import s from './posts.module.scss'

export const Posts = () => {
	const [posts, setPosts] = useState([{ key: 'd' }, { key: '' }])
	console.log(posts.length)

	return (
		<div className={`container ${s.posts}`}>
			<h2 className={`section-title tac `}>Ваши публикации</h2>
			{posts.length === 0 ? (
				<p className={s.emptyPosts}>Постов нету :)</p>
			) : (
				posts.map((el) => <Post key={el.key} />)
			)}
		</div>
	)
}
