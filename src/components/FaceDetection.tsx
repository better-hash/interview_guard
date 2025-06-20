import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

interface FaceDetectionProps {
  onWarning: (warning: string) => void;
}

const FaceDetection: React.FC<FaceDetectionProps> = ({ onWarning }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceVisible, setFaceVisible] = useState(false);
  const faceCheckInterval = useRef<number | null>(null);

  // Load face detection models
  useEffect(() => {
    const loadModels = async () => {
      try {
        // Only load the TinyFaceDetector model since we're having issues with the others
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        setModelsLoaded(true);
        console.log('Face detection model loaded');
      } catch (error) {
        console.error('Error loading face detection model:', error);
      }
    };

    loadModels();
  }, []);

  // Start video stream
  useEffect(() => {
    if (!modelsLoaded) return;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsDetecting(true);
      } catch (error) {
        console.error('Error accessing webcam:', error);
        onWarning('无法访问摄像头，请确保摄像头已连接并授予访问权限');
      }
    };

    startVideo();

    return () => {
      // Cleanup video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [modelsLoaded, onWarning]);

  // Face detection process
  useEffect(() => {
    if (!isDetecting || !videoRef.current || !canvasRef.current) return;

    const detectFace = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.width;
      canvas.height = video.height;
      
      // Only use detectAllFaces without landmarks since we only loaded TinyFaceDetector
      const detections = await faceapi.detectAllFaces(
        video, 
        new faceapi.TinyFaceDetectorOptions()
      );
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      if (detections.length === 0) {
        if (faceVisible) {
          setFaceVisible(false);
          onWarning('未检测到面部，请确保面部在摄像头范围内');
        }
      } else if (detections.length > 1) {
        onWarning('检测到多个面部，请确保只有一个人在摄像头范围内');
      } else {
        setFaceVisible(true);
        
        // Draw detections
        faceapi.draw.drawDetections(canvas, detections);
      }
    };

    // Run face detection at intervals
    const interval = setInterval(detectFace, 1000);
    faceCheckInterval.current = interval;

    return () => {
      if (faceCheckInterval.current) {
        clearInterval(faceCheckInterval.current);
      }
    };
  }, [isDetecting, onWarning, faceVisible]);

  return (
    <div className="face-detection">
      <h3>面部检测 {modelsLoaded ? '(已加载)' : '(加载中...)'}</h3>
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.play();
            }
          }}
        />
        <canvas ref={canvasRef} className="face-canvas" />
      </div>
      <div className="status">
        <div className={`status-indicator ${faceVisible ? 'status-active' : 'status-warning'}`}></div>
        <span>{faceVisible ? '面部可见' : '未检测到面部'}</span>
      </div>
    </div>
  );
};

export default FaceDetection; 