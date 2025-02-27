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
      <Canvas shadows camera={{ position: [25, 35, 45], fov: 60, aspect }}>
        <color attach="background" args={['#eaeaea']} />
        <Physics>
          <Room />
        </Physics>
      </Canvas>
    </div>
  )
}

export default Myhome
