import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../utils/store/useAuthStore'; // your auth store
import { handleCaptureTime } from '../../utils/captureTime.util';

export default function Attendance() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // Store stream reference

  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Get user from auth store
  const { user } = useAuthStore();

  // Function to stop all camera tracks
  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => {
        track.stop();
        console.log('Camera track stopped:', track.kind);
      });
      streamRef.current = null;
    }

    // Also clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const getVideo = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1920,
          height: 1080,
          facingMode: 'user', // Prefer front camera for selfies
        },
      });

      // Store stream reference
      streamRef.current = stream;

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play();
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera access denied. Please allow camera access.'
          : err.name === 'NotFoundError'
            ? 'No camera found on this device.'
            : 'Failed to access camera. Please try again.',
      );
    }
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

        // Convert canvas to blob
        photo.toBlob((blob) => {
          if (blob) {
            setPhotoBlob(blob);
            setHasPhoto(true);

            // Pause video but don't stop camera (optional)
            video.pause();
          }
        }, 'image/jpeg');
      }
    }
  };

  const closePhoto = () => {
    const photo = photoRef.current;
    const video = videoRef.current;

    if (photo) {
      const ctx = photo.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
        setPhotoBlob(null);
      }
    }

    // Resume video if it was paused
    if (video && streamRef.current) {
      video.play().catch(console.error);
    }
  };

  const uploadPhoto = async () => {
    if (!photoBlob || !user) return;

    setUploading(true);
    try {
      // Create a unique filename
      const fileName = `${user.id}/${Date.now()}.jpg`;

      // Your upload logic here...
      console.log('Uploading photo:', fileName);

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      alert('Photo uploaded successfully!');

      // Reset and stop camera
      closePhoto();
      stopCamera(); // Stop camera after successful upload
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    // Start camera when component mounts
    getVideo();

    // Cleanup function runs when component unmounts
    return () => {
      console.log('Cleaning up camera...');
      stopCamera();
    };
  }, []); // Empty dependency array = run once on mount

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-16 lg:px-8 overflow-hidden bg-slate-950">
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-800">
        <div className="text-2xl font-bold text-white mb-8">
          Record Attendance
        </div>

        {/* Camera Error Display */}
        {cameraError && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {cameraError}
          </div>
        )}

        <div className="space-y-4">
          {/* Camera View */}
          <div className="camera">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full max-w-lg rounded-lg border border-slate-700"
            />
            {!hasPhoto && !cameraError && (
              <button
                className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                onClick={() => {
                  takePhoto();
                  handleCaptureTime();
                }}
              >
                Take Photo
              </button>
            )}
          </div>

          {/* Photo Preview */}
          <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
            <canvas
              ref={photoRef}
              className="w-full max-w-lg rounded-lg border border-slate-700"
            />
            {hasPhoto && (
              <div className="mt-4 flex space-x-4">
                <button
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50"
                  onClick={uploadPhoto}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Submit'}
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all"
                  onClick={closePhoto}
                  disabled={uploading}
                >
                  Retake
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
