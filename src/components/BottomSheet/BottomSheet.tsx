import { HomeIcon } from '@assets/icons/Ui/HomeIcon'
import { PostsIcon } from '@assets/icons/Ui/PostsIcon'
import { SettingsIcon } from '@assets/icons/Ui/SettingsIcon'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import s from './bottom-sheet.module.scss'

export const BottomSheet = () => {
	const { t } = useTranslation()
	return (
		<div className={`${s.bottomSheet}`}>
			<nav className={s.bottomSheetWrapper}>
				<ul>
					<li>
						<NavLink className={s.bottomSheetLink} to={'/page/home'}>
							<HomeIcon />
							<span>{t('bottomsheet.home')}</span>
						</NavLink>
					</li>
					<li>
						<NavLink className={s.bottomSheetLink} to={'/page/posts'}>
							<PostsIcon />
							<span>{t('bottomsheet.posts')}</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							className={s.bottomSheetLink}
							to={'/page/profile-settings'}
						>
							<SettingsIcon />
							<span>{t('bottomsheet.account')}</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}
