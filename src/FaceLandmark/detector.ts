import {
  FaceLandmarksDetector,
  SupportedModels,
  createDetector,
} from '@tensorflow-models/face-landmarks-detection'

import { drawMesh } from './drawMesh'

const detect = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement | null,
  net: FaceLandmarksDetector,
) => {
  try {
    const faces = await net.estimateFaces(video, {
      flipHorizontal: false,
      staticImageMode: true,
    })

    console.log('faces => ', faces)

    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        requestAnimationFrame(() => drawMesh(faces[0], ctx))
        // detect(video, canvas, net) // 실시간 렌더링을 위해 재귀 호출
      }
    }
  } catch (error) {
    net.dispose()
    console.log('Error => ', error)
  }
}

export const runDetector = async (video: HTMLVideoElement, canvas: HTMLCanvasElement | null) => {
  const model = SupportedModels.MediaPipeFaceMesh

  const detector = await createDetector(model, {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
    refineLandmarks: false,
    maxFaces: 1,
  })

  detect(video, canvas, detector)
}
