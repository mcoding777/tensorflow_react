
import { RefObject, useEffect, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

export const ImageClassifier = () => {
  const camera: RefObject<HTMLVideoElement> = useRef(null);
  const figures: RefObject<HTMLDivElement> = useRef(null);
  const webcamElement = camera.current;

  const run = async () => {
    const model = await mobilenet.load();

    const webcam = await tf.data.webcam(webcamElement || undefined, {
      resizeWidth: 220,
      resizeHeight: 227,
    });
    
    while (true) {
      const img = await webcam.capture();
      const result = await model.classify(img);

      if (figures.current) {
        figures.current.innerText = `prediction : ${result[0].className} \n probability: ${result[0].probability}`;
      }

      img.dispose();

      await tf.nextFrame();
    }
  };
  
useEffect(()=> {
  run();
});

  return (
    <>
      <div ref={figures}></div>
      <video
        autoPlay
        // playsInline
        muted={true}
        ref={camera}
        width={870}
        height={534}
      />
    </>
  );
};