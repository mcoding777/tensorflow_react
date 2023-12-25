import { Box, OrbitControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { Fragment } from 'react'

export const Room = () => {
  return (
    <Fragment>
      <OrbitControls />
      <ambientLight intensity={1.5} />
      <hemisphereLight args={['#aaaaaa', '#ababab', 0.5]} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      <RigidBody type="fixed">
        {/* 바닥 */}
        <Box position={[0, 0, 0]} args={[20, 0.5, 20]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
        {/* 왼쪽 벽 */}
        <Box position={[-10, 5, 0]} args={[0.5, 10, 20]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
        {/* 오른쪽 벽 */}
        <Box position={[0, 5, -10]} args={[20, 10, 0.5]}>
          <meshStandardMaterial color="#e5e5e5" />
        </Box>
      </RigidBody>
    </Fragment>
  )
}
