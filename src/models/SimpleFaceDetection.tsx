import { useState, useRef, useEffect } from 'react';
import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as facedetection from '@tensorflow-models/face-detection';
import Webcam from 'react-webcam';
import { Button, Card, createStyles, Text } from '@mantine/core';

const useStyles = createStyles(() => ({
  card: {
    maxWidth: 640,
  },
  skeleton: {
    backgroundColor: '#000',
    width: 640,
    height: 480,
  },
  webcam: {
    position: 'relative',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

export default function SimpleFaceDetection() {
  const { classes } = useStyles();
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runFaceDetection = async () => {
    const model = facedetection.SupportedModels.MediaPipeFaceDetector;
    const detector = await facedetection.createDetector(model, {
      runtime: 'tfjs',
      maxFaces: 1,
    });
    detectFn(detector);
  };

  const runCtxDraw = (faces: facedetection.Face[]) => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        faces.forEach((face) => {
          const x = face.box.xMin;
          const y = face.box.yMin;
          const w = face.box.width;
          const h = face.box.height;
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#FFD43B';
          ctx.strokeRect(x, y, w, h);
          ctx.fillStyle = '#FFD43B';
          face.keypoints.map((point) => ctx.fillRect(point.x, point.y, 4, 4));
        });
      }
    }
  };

  const detectFn = async (detector: facedetection.FaceDetector) => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const faces = await detector.estimateFaces(webcamRef.current.video);
      runCtxDraw(faces);
      detectFn(detector);
    }
    return;
  };

  useEffect(() => {
    if (isWebcamActive) {
      runFaceDetection();
    }
  }, [isWebcamActive]);
  return (
    <>
      <Card className={classes.card} shadow="md" radius="md">
        <Card.Section className={classes.skeleton}>
          {isWebcamActive && (
            <>
              <Webcam ref={webcamRef} audio={false} width={640} height={480} />
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className={classes.canvas}
              />
            </>
          )}
        </Card.Section>
        <Text pt={12} weight={600}>
          Simple Face Detection
        </Text>
        <Text size="sm" color="dimmed">
          Example of Face Detection Application using Mediapipe based on
          Blazeface, a fast sub-millisecond neural face detection tailored for
          mobile GPUs
        </Text>
        <Button
          variant="light"
          color={isWebcamActive ? 'red' : 'blue'}
          fullWidth
          mt="md"
          radius="md"
          onClick={() => setIsWebcamActive(!isWebcamActive)}
        >
          {isWebcamActive ? 'Deactivate' : 'Activate'} Camera
        </Button>
      </Card>
    </>
  );
}
