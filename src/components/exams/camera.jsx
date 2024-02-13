import React, { useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);

  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the image source, like displaying it or uploading it
    console.log(imageSrc);
    requestAnimationFrame(captureFrame);
  };

  useEffect(() => {
    if (webcamRef.current) {
      captureFrame();
    }
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={80}
        height={80}
      />
      
    </>
  );
};

export default CameraComponent;
