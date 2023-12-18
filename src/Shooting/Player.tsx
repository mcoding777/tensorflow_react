import * as RAPIER from '@dimforge/rapier3d-compat'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const KEYS = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump',
}

const MOVE_SPEED = 5

const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

type Movement = {
  [key in (typeof KEYS)[keyof typeof KEYS]]: boolean
}

export const Player = () => {
  const [movement, setMovement] = useState<Movement>(
    Object.values(KEYS).reduce((prev, curr) => ({ ...prev, [curr]: false }), {}),
  )
  const { forward, backward, left, right, jump } = movement

  // 객체
  const playerRef = useRef<RapierRigidBody>(null)
  const rapier = useRapier()

  const setMovementStatus = useCallback((code: keyof typeof KEYS, status: boolean) => {
    setMovement((current) => ({ ...current, [KEYS[code]]: status }))
  }, [])

  const doJump = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.setLinvel({ x: 0, y: 8, z: 0 }, true)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (KEYS?.[event.code as keyof typeof KEYS]) {
        const key = event.code as keyof typeof KEYS
        setMovementStatus(key, true)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (KEYS?.[event.code as keyof typeof KEYS]) {
        const key = event.code as keyof typeof KEYS
        setMovementStatus(key, false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // 초당 60프레임
  useFrame((state) => {
    if (!playerRef.current) return

    // 플레이어의 현재 선형 속도
    const velocity = playerRef.current.linvel()

    // 전진, 후진 모션
    frontVector.set(0, 0, +backward - +forward)
    sideVector.set(+left - +right, 0, 0)

    // 이동 벡터를 제외하고 결과를 정규화(벡터 길이가 1이 되도록)해서 이동속도 상수를 곱하여 플레이어 이동의 최종 벡터 계산
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVE_SPEED)

    // 계산된 이동 방향을 기반으로 플레이어의 새로운 선형 속도를 설정하고 수직 속도 유지 (점프나 추락에 영향을 주지 않도록)
    playerRef.current.setLinvel(
      {
        x: direction.x,
        y: velocity.y,
        z: direction.z,
      },
      true, // 플레이어 객체를 깨움 (일정시간 지나면 객체가 '잠자기' 상태로 변해서 위치 변경에 반응하지않음)
    )

    /////////// 점프

    // 물리 엔진 객체
    const world = rapier.world

    // 레이 캐스팅 (플레이어의 현재 위치에서 시작하여 y축 아래를 가리키는 광선이 생성됨)
    const ray = world.castRay(
      new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 }),
      1,
      true,
    )

    // 플레이어가 지상에 있는지 확인 (true: 지상에 있음)
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1

    if (jump && grounded) doJump()
  })

  return (
    <RigidBody position={[0, 1, -2]} ref={playerRef} mass={1} lockRotations>
      <mesh>
        <capsuleGeometry args={[0.5, 0.5]} />
      </mesh>
    </RigidBody>
  )
}
