import {
    useRef,
    type MutableRefObject,
    useEffect,
    type HTMLAttributes
} from 'react';

interface WebcamCanvasType extends HTMLAttributes<HTMLCanvasElement> {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

const WebcamCanvas = ({ canvasRef, ...props }: WebcamCanvasType) => {
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true
                });

                streamRef.current = stream;

                const video = document.createElement('video');

                video.srcObject = stream;

                video.play();

                video.addEventListener('loadeddata', () => {
                    drawToCanvas(video);
                });
            } catch (error) {
                console.error('Error accessing webcam: ', error);
            }
        };

        const drawToCanvas = (video: HTMLVideoElement) => {
            const canvas = canvasRef.current;

            if (!canvas) return;

            const context = canvas.getContext('2d');

            if (!context) return;

            const drawFrame = () => {
                if (!canvas || !video.videoWidth || !video.videoHeight) return;

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                requestAnimationFrame(drawFrame);
            };

            drawFrame();
        };

        startWebcam();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => {
                    track.stop();
                });
                streamRef.current = null;
            }
        };
    }, []);

    return <canvas {...props} ref={canvasRef} />;
};

export default WebcamCanvas;
