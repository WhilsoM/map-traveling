export function ModelViewer() {
	return (
		<div className='sketchfab-embed-wrapper'>
			<iframe
				allowFullScreen
				allow='autoplay; fullscreen; xr-spatial-tracking'
				xr-spatial-tracking='true'
				execution-while-out-of-viewport='true'
				execution-while-not-rendered='true'
				src='https://sketchfab.com/models/142ff04d8ffd4912a5e5bd11542ca6fc/embed'
			></iframe>
		</div>
	)
}
