// import { useTexture } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

export const Ground = () => {
  const texture = useTexture(
    'https://images.unsplash.com/photo-1525468568166-6f2cd17c7ec9?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    (current) => {
      const curr = current as THREE.Texture
      curr.wrapS = curr.wrapT = THREE.RepeatWrapping // 이미지를 반복해서 매핑
      curr.repeat.x = curr.repeat.y = 360 // 텍스쳐를 몇개 반복할건지 (= 이미지 크기 조정)
    },
  )

  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh position={[0, -5, 0]} rotation={new THREE.Euler(-Math.PI / 2)}>
        <planeGeometry args={[500, 500]} />
        <ambientLight intensity={1.5} />
        <meshStandardMaterial color="gray" map={texture} />
      </mesh>
      <CuboidCollider args={[500, 2, 500]} position={[0, -2, 0]} />
    </RigidBody>
  )
}
