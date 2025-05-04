import { ButtonUi } from '@ui/index'
import { useTranslation } from 'react-i18next'
import s from '../profile.module.scss'

export const LangSwitcher = () => {
	const { i18n } = useTranslation()

	const changeLanguage = (lng: 'ru' | 'en' | 'ja') => {
		i18n.changeLanguage(lng)
		localStorage.setItem('language', lng)
	}

	return (
		<div className={s.changeLanguages}>
			<ButtonUi onClick={() => changeLanguage('ru')}>RU</ButtonUi>
			<ButtonUi onClick={() => changeLanguage('en')}>EN</ButtonUi>
			<ButtonUi onClick={() => changeLanguage('ja')}>JA</ButtonUi>
		</div>
	)
}
