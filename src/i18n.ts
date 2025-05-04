import en from '@shared/locales/en/translation.json'
import ja from '@shared/locales/ja/translation.json'
import ru from '@shared/locales/ru/translation.json'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		ru: { translation: ru },
		ja: { translation: ja },
	},
	lng: localStorage.getItem('language') || 'ru',
	fallbackLng: 'en',

	interpolation: {
		escapeValue: false,
	},
})

export default i18n
