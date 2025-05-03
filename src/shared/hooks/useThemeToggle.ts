export const useThemeToggle = () => {
	const current = document.documentElement.getAttribute('data-theme')
	const next = current === 'dark' ? 'light' : 'dark'
	document.documentElement.setAttribute('data-theme', next)
}
