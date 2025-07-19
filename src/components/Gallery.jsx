import { useState, useEffect } from 'react';
import image1 from '../public/images/our-place/image1.JPG';
import image2 from '../public/images/our-place/image2.JPG';
import image3 from '../public/images/our-place/image3.jpg';

const images = [
  '/images/our-place/image1.jpg',
  '/images/our-place/image2.jpg',
  '/images/our-place/image3.jpg',
];

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = (img) => {
    setCurrentImage(img);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => openModal(img)}
            className="group relative overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02] focus:outline-none"
          >
            <img
              src={img}
              alt={`Χώρος θεραπείας ${index + 1}`}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
        >
          <img
            src={currentImage}
            alt="Full view"
            className="w-auto h-auto max-w-[100vw] max-h-[100vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
