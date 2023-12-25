import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useMemo } from 'react'

import { Room } from './Room'

const Myhome = () => {
  const aspect = useMemo(() => window.innerWidth / window.innerHeight, [])

  return (
    <div
      id="container"
      style={{
        height: '100vh',
      }}
    >
      <Canvas shadows camera={{ position: [10, 25, 25], fov: 80, aspect }}>
        <color attach="background" args={['#eaeaea']} />
        <Physics>
          <Room />
        </Physics>
      </Canvas>
    </div>
  )
}

export default Myhome
