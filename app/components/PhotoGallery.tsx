'use client';

import { useState } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

// Real photos of mama
const mamaPhotos: Photo[] = [
  {
    id: 1,
    src: '/photos/mom.png',
    alt: 'Mama tersenyum',
    caption: 'Senyum Mama yang selalu menghangatkan hati ☺️',
  },
  {
    id: 2,
    src: '/photos/best-mom.png',
    alt: 'Mama terbaik di dunia',
    caption: 'Mama terbaik di dunia! Terima kasih untuk segalanya 👑',
  },
  {
    id: 3,
    src: '/photos/mom-me.png',
    alt: 'Mama dan aku',
    caption: 'Kenangan indah bersama Mama tercinta 💕',
  },
];

// Custom Image component with fallback
function CustomImage({ src, alt, className, onClick }: { 
  src: string; 
  alt: string; 
  className?: string; 
  onClick?: () => void; 
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 animate-pulse flex items-center justify-center">
          <div className="text-pink-400 text-4xl">📷</div>
          <div className="text-sm text-gray-500 mt-2">Loading...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 flex flex-col items-center justify-center">
          <div className="text-red-400 text-4xl">❌</div>
          <div className="text-sm text-gray-500 mt-2">Failed to load</div>
          <div className="text-xs text-gray-400 mt-1">{src}</div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => {
          console.log('✅ Image loaded successfully:', src);
          setLoaded(true);
        }}
        onError={(e) => {
          console.error('❌ Image failed to load:', src, e);
          setError(true);
        }}
        onClick={onClick}
      />
    </div>
  );
}

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
        📸 Gallery Kenangan Bersama Mama
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mamaPhotos.map((photo) => (
          <div key={photo.id} className="group cursor-pointer" onClick={() => openModal(photo)}>
            <div className="relative overflow-hidden rounded-xl shadow-lg aspect-square border-2 border-pink-200 hover:border-pink-300 transition-all duration-300 group-hover:scale-105">
              {/* Custom image with proper loading and error handling */}
              <CustomImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openModal(photo)}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center z-10">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-gray-800 text-sm font-medium">Klik untuk Perbesar</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Caption */}
            <div className="mt-3 text-center">
              <p className="text-gray-700 text-sm font-medium">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing photos */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Foto Kenangan</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              {/* Real photo */}
              <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-pink-200 mb-4 max-w-md mx-auto">
                <CustomImage
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Caption */}
              <div className="text-center">
                <p className="text-gray-800 font-medium text-lg">
                  {selectedPhoto.caption}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  {selectedPhoto.alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo information */}
      <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">� Kenangan Indah Bersama Mama</h3>
        <p className="text-green-700 text-sm">
          Setiap foto ini menyimpan kenangan berharga yang tak akan pernah terlupakan. 
          Meski jarak memisahkan, cinta dan kerinduan untuk Mama tetap sama. ✨
        </p>
      </div>
    </div>
  );
}
