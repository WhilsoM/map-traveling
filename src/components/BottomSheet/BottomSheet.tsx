import { HomeIcon } from '@assets/icons/Ui/HomeIcon'
import { PostsIcon } from '@assets/icons/Ui/PostsIcon'
import { SettingsIcon } from '@assets/icons/Ui/SettingsIcon'
import { NavLink } from 'react-router'
import s from './bottom-sheet.module.scss'

export const BottomSheet = () => {
	return (
		<div className={`${s.bottomSheet}`}>
			<nav className={s.bottomSheetWrapper}>
				<ul>
					<li>
						<NavLink className={s.bottomSheetLink} to={'/page/home'}>
							<HomeIcon />
							<span>Главная</span>
						</NavLink>
					</li>
					<li>
						<NavLink className={s.bottomSheetLink} to={'/page/posts'}>
							<PostsIcon />
							<span>Публикации</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={s.bottomSheetLink}
							to={'/page/profile-settings'}
						>
							<SettingsIcon />
							<span>Аккаунт</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}
