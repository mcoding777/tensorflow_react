import { SupportedModels, createDetector, FaceLandmarksDetector } from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";

export const runDetector = async (video: HTMLVideoElement, canvas: HTMLCanvasElement | null) => {
    const model = SupportedModels.MediaPipeFaceMesh;
  
    const detector = await createDetector(model, {
      // runtime: 'tfjs',
      runtime: 'mediapipe', // or 'tfjs'
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
      refineLandmarks: false,
      maxFaces: 1,
    });
    
    const detect = async (net: FaceLandmarksDetector) => {
      try {
        const faces = await net.estimateFaces(video, {
          flipHorizontal: false,
          staticImageMode: true,
        });
    
        console.log('faces => ', faces);
    
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            requestAnimationFrame(() => drawMesh(faces[0], ctx));
            // detect(detector); // 실시간 렌더링을 위해 재귀 호출
          }
        }
      } catch (error) {
        detector.dispose();
        console.log('Error => ', error);
      }
    }
  
    detect(detector);
  }