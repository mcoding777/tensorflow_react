import { Box, OrbitControls, useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Fragment } from 'react'
import * as THREE from 'three'

export const Room = () => {
  const texture = useTexture(
    'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    (current) => {
      const curr = current as THREE.Texture
      curr.wrapS = curr.wrapT = THREE.RepeatWrapping // 이미지를 반복해서 매핑
      curr.repeat.x = curr.repeat.y = 1 // 텍스쳐를 몇개 반복할건지 (= 이미지 크기 조정)
    },
  )

  const roundedRectShape = new THREE.Shape()

  ;(function roundedRect(ctx, x, y, width, height, radius) {
    ctx.moveTo(x, y + radius)
    ctx.lineTo(x, y + height - radius)
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
    ctx.lineTo(x + width - radius, y + height)
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    ctx.lineTo(x + width, y + radius)
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
    ctx.lineTo(x + radius, y)
    ctx.quadraticCurveTo(x, y, x, y + radius)
  })(roundedRectShape, 0, 0, 50, 50, 20)

  return (
    <Fragment>
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <hemisphereLight args={['#aaaaaa', '#ababab', 0.5]} />
      <directionalLight position={[5, 15, 0]} intensity={0.4} />
      <RigidBody type="fixed">
        {/* 바닥 */}
        <Box position={[0, 0, 0]} args={[20, 0.5, 20]}>
          <meshStandardMaterial color="#e5e5e5" map={texture} />
        </Box>
        {/* 왼쪽 벽 */}
        <Box
          position={[-10, 4.75, 0]}
          args={[0.5, 10, 20]}
          // radius={0.2}
          // smoothness={1}
          // bevelSegments={0}
        >
          <meshPhysicalMaterial color="#e5e5e5" map={texture} />
        </Box>
        {/* <Image url="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
          <Shape>
            <meshStandardMaterial color="hotpink" />
          </Shape>
        </Image> */}
        {/* 오른쪽 벽 */}
        <Box position={[-0.125, 4.75, -10]} args={[20.25, 10, 0.5]}>
          <meshStandardMaterial color="#e5e5e5" map={texture} />
        </Box>
      </RigidBody>
    </Fragment>
  )
}
