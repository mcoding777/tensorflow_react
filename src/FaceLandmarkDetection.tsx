// import '@tensorflow/tfjs-core';
// import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs";
import '@tensorflow/tfjs-backend-webgl';
import "@mediapipe/face_mesh";
import { RefObject, SyntheticEvent, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { OUTPUT_SIZE } from './FaceLandmark/constant';
import { runDetector } from './FaceLandmark/detector';

export const FaceLandmarkDetection = () => {
    const canvas: RefObject<HTMLCanvasElement> = useRef(null);

    const [loaded, setLoaded] = useState(false);

    const handleVideoLoad = (videoNode: SyntheticEvent<HTMLVideoElement, Event>) => {
      const video = videoNode.currentTarget;
      if (video.readyState !== 4) return;
      if (loaded) return;
      runDetector(video, canvas.current); //running detection on video
      setLoaded(true);
    }
    
    return (
        <div style={{
          position: 'relative',
          ...OUTPUT_SIZE,
        }}>
    
    <Webcam
        style={{ position: "absolute", left: 0, visibility: 'hidden' }}
        videoConstraints={{
          ...OUTPUT_SIZE,
          facingMode: "user",
        }}
        onLoadedData={handleVideoLoad}
      />
      <canvas ref={canvas} {...OUTPUT_SIZE} style={{
        position: 'absolute',
        left: 0,
      }} />
      {loaded ? <></> : <header>Loading...</header>}
  </div>
    )
}