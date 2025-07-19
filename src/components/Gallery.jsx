import { useState } from 'react';
import image1 from '../assets/our-place/place1.jpg';
import image2 from '../assets/our-place/place2.jpg';
import image3 from '../assets/our-place/place3.jpg';

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const images = [image1, image2, image3];

  const openModal = (img) => {
    setCurrentImage(img);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

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
              src={img.src}
              alt={`Χώρος θεραπείας ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
        >
          <img
            src={currentImage.src}
            alt="Μεγέθυνση εικόνας"
            className="max-w-full max-h-full rounded-xl shadow-xl"
          />
        </div>
      )}
    </div>
  );
}
