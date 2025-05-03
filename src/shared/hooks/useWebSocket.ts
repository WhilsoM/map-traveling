import { useEffect, useRef } from 'react'

export function useWebSocket(onMessage: (data: any) => void) {
	const ws = useRef<WebSocket>(null)

	useEffect(() => {
		ws.current = new WebSocket('ws://localhost:3000')
		console.log('useWebsocket', ws.current)

		ws.current.onmessage = (event) => {
			const message = JSON.parse(event.data)
			onMessage(message)
		}

		return () => {
			ws.current?.close()
		}
	}, [onMessage])
	console.log('usewebsocket ws current', ws.current)

	return ws.current
}
