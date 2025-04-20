import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@types': path.resolve(__dirname, './src/types'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@api': path.resolve(__dirname, './src/shared/api'),
			'@ui': path.resolve(__dirname, './src/shared/ui'),
		},
	},
})
