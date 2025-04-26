import { Home } from '@assets/icons/Ui/Home'
import { Posts } from '@assets/icons/Ui/Posts'
import { Settings } from '@assets/icons/Ui/Settings'
import { NavLink } from 'react-router'
import s from './bottom-sheet.module.scss'

export const BottomSheet = () => {
	return (
		<div className={`${s.bottomSheet}`}>
			<div className={s.bottomSheet__wrapper}>
				<ul>
					<li>
						<NavLink className={s.bottomSheet__link} to={'/page/home'}>
							<Home />
							<span>Главная</span>
						</NavLink>
					</li>
					<li>
						<NavLink className={s.bottomSheet__link} to={'/page/posts'}>
							<Posts />
							<span>Публикации</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={s.bottomSheet__link}
							to={'/page/profile-settings'}
						>
							<Settings />
							<span>Аккаунт</span>
						</NavLink>
					</li>
				</ul>
			</div>
		</div>
	)
}
