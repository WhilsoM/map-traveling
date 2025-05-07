import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function Model() {
	const { scene } = useGLTF('/models/scene.gltf')
	if (!scene) return null
	return <primitive object={scene} scale={1.5} />
}

export default function ModelViewer() {
	return (
		<Canvas camera={{ position: [0, 0, 5] }}>
			<ambientLight />
			<directionalLight position={[2, 2, 2]} />
			<Model />
			<OrbitControls />
		</Canvas>
	)
}
useGLTF.preload('/models/scene.gltf')
