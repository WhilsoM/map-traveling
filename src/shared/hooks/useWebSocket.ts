import { useEffect, useRef } from 'react'

export function useWebSocket(onMessage: (data: any) => void) {
	const ws = useRef<WebSocket>(null)

	useEffect(() => {
		ws.current = new WebSocket('ws://localhost:3000')

		ws.current.onmessage = (event) => {
			const message = JSON.parse(event.data)
			onMessage(message)
		}

		return () => {
			ws.current?.close()
		}
	}, [onMessage])

	return ws.current
}
