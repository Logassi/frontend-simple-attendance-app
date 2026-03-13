import { useEffect, useRef, useState } from 'react';
import { handleCaptureTime } from '../../utils/captureTime.util';

export default function Attendance() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
          setHasPhoto(true);
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    const video = videoRef.current;
    const photo = photoRef.current;
    if (video && photo) {
      photo.width = width;
      photo.height = height;
      const ctx = photo.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
      }
    }
  };

  const closePhoto = () => {
    const photo = photoRef.current;
    if (photo) {
      const ctx = photo.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
      }
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-16 lg:px-8 overflow-hidden">
      <div>
        <div className="text-2xl font-bold mb-8">Record Attendance</div>
        <div>
          <div className="camera">
            <video ref={videoRef}></video>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                takePhoto();
                handleCaptureTime();
              }}
            >
              Take Photo
            </button>
          </div>
          <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
            <canvas ref={photoRef}></canvas>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={closePhoto}
              //   bisa masukan ke handleSubmit untuk submit data ke backend
            >
              Submit
            </button>
          </div>
        </div>
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCaptureTime}
        >
          Capture Time
        </button> */}
      </div>
    </section>
  );
}
