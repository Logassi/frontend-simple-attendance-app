import { useEffect, useRef, useState } from 'react';
import useAuthStore from '../../utils/store/useAuthStore'; // your auth store
import { handleCaptureTime } from '../../utils/captureTime.util';

export default function Attendance() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null); // Store the photo
  const [uploading, setUploading] = useState(false);

  // Get user from auth store
  const { user } = useAuthStore();

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

        // Convert canvas to blob
        photo.toBlob((blob) => {
          if (blob) {
            setPhotoBlob(blob);
            setHasPhoto(true);
          }
        }, 'image/jpeg');
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
        setPhotoBlob(null);
      }
    }
  };

  const uploadPhoto = async () => {
    if (!photoBlob || !user) return;

    setUploading(true);
    try {
      // Create a unique filename
      const fileName = `${user.id}/${Date.now()}.jpg`;

      // // Upload to Supabase storage
      // const { data, error } = await supabase.storage
      //   .from('attendance-photos') // your bucket name
      //   .upload(fileName, photoBlob, {
      //     contentType: 'image/jpeg',
      //     cacheControl: '3600',
      //   });

      // if (error) throw error;

      // // Get public URL
      // const {
      //   data: { publicUrl },
      // } = supabase.storage.from('attendance-photos').getPublicUrl(fileName);

      // Here you can also save the URL to your database
      // console.log('Photo uploaded:', publicUrl);

      // Show success message
      // Optionally reset the form
      closePhoto();
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, []); // Remove videoRef dependency

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-16 lg:px-8 overflow-hidden bg-slate-950">
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-800">
        <div className="text-2xl font-bold text-white mb-8">
          Record Attendance
        </div>

        <div className="space-y-4">
          {/* Camera View */}
          <div className="camera">
            <video
              ref={videoRef}
              className="w-full max-w-lg rounded-lg border border-slate-700"
            />
            {!hasPhoto && (
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
