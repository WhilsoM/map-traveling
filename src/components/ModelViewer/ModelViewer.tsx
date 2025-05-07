import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function Model() {
	const { scene, error } = useGLTF('/models/scene.gltf')

	if (error) {
		console.error('Error loading model:', error)
		return null
	}

	if (!scene) {
		return <p>Loading...</p>
	}

	return <primitive object={scene} scale={1.5} />
}

export function ModelViewer() {
	return (
		<Canvas camera={{ position: [0, 0, 5] }}>
			<ambientLight />
			<directionalLight position={[2, 2, 2]} />
			<Model />
			<OrbitControls />
		</Canvas>
	)
}
