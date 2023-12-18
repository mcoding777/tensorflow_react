import { PointerLockControls, Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'

import { Ground } from './Ground'
import { Player } from './Player'

const ShootingGame = () => {
  return (
    <div
      id="container"
      style={{
        height: '100vh',
      }}
    >
      <div
        className="aim"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 10,
          height: 10,
          border: '2px solid white',
          borderRadius: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          zIndex: 2,
        }}
      />
      <Canvas
        camera={{
          fov: 90, // 배율
          position: [0, 3, 2],
        }}
      >
        <PointerLockControls />
        <Sky sunPosition={[100, 20, 100]} />
        <Physics gravity={[0, -20, 0]}>
          <Ground />
          <Player />
          <RigidBody>
            <mesh position={[0, 3, -5]}>
              <boxGeometry />
            </mesh>
          </RigidBody>
        </Physics>
      </Canvas>
    </div>
  )
}

export default ShootingGame
