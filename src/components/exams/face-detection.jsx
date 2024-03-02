import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetectionComponent = () => {
  const videoRef = useRef(null);
  const [consecutiveNoFaceDetections, setConsecutiveNoFaceDetections] = useState(0);
  const [consecutiveMulFaceDetections, setConsecutiveMulFaceDetections] = useState(0);
  useEffect(() => {
    const loadModelsAndStartDetection = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } else {
          throw new Error('getUserMedia is not supported');
        }

        videoRef.current.addEventListener('loadedmetadata', () => {
          detectFaces();
        });
      } catch (error) {
        console.error('Error loading models or accessing webcam:', error);
      }
    };

    const detectFaces = async () => {
      if (!videoRef.current) return; // Ensure video element exists
        var NOfaceDet=0
        var MulFaceDet=0
      const video = videoRef.current;

      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);

      const displaySize = { width: video.videoWidth, height: video.videoHeight }; // Use videoWidth and videoHeight
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({inputSize:160,scoreThreshold:0.3})).withFaceLandmarks();
        
        // Clear previous drawings
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        
// draw detections into the canvas


        if (detections.length === 1) {
          console.log('Face detected');
          // Draw landmarks on each detected face
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetections)
        } else if(detections.length===0) {
          console.log('No Face detected');
            NOfaceDet++
          if (NOfaceDet >= 10) { // Change this value as needed
            NOfaceDet=0; // Reset counter
            alert('No face detected multiple times!');
          }
        }else{
            MulFaceDet++;
            if (consecutiveNoFaceDetections >= 5) { // Change this value as needed
              alert('more than one face detected multiple times!');
              MulFaceDet=0; // Reset counter
            }
        }
      }, 1000); // Adjust interval as needed
    };

    loadModelsAndStartDetection();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline muted style={{ height:"80px",width:"80px" }} />;
};

export default FaceDetectionComponent;



