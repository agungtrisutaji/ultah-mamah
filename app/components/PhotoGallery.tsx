'use client';

import { useState } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

// Placeholder photos - user can replace with real photos later
const placeholderPhotos: Photo[] = [
  {
    id: 1,
    src: '/photos/placeholder-1.jpg',
    alt: 'Foto kenangan dengan Mama',
    caption: 'Momen indah bersama Mama tersayang 💕'
  },
  {
    id: 2,
    src: '/photos/placeholder-2.jpg',
    alt: 'Mama saat tersenyum',
    caption: 'Senyum Mama yang selalu menghangatkan hati ☺️'
  },
  {
    id: 3,
    src: '/photos/placeholder-3.jpg',
    alt: 'Keluarga berkumpul',
    caption: 'Kebersamaan keluarga yang tak ternilai 👨‍👩‍👧‍👦'
  },
  {
    id: 4,
    src: '/photos/placeholder-4.jpg',
    alt: 'Mama saat memasak',
    caption: 'Mama chef terbaik di dunia! 👩‍🍳'
  },
  {
    id: 5,
    src: '/photos/placeholder-5.jpg',
    alt: 'Ulang tahun sebelumnya',
    caption: 'Ulang tahun tahun lalu yang tak terlupakan 🎂'
  },
  {
    id: 6,
    src: '/photos/placeholder-6.jpg',
    alt: 'Mama dan anak-anak',
    caption: 'Mama dan anak-anaknya yang bahagia 🥰'
  }
];

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
        {placeholderPhotos.map((photo) => (
          <div key={photo.id} className="group cursor-pointer" onClick={() => openModal(photo)}>
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-pink-100 to-purple-100 aspect-square flex items-center justify-center border-2 border-pink-200 hover:border-pink-300 transition-all duration-300 group-hover:scale-105">
              {/* Placeholder for actual photos */}
              <div className="text-center p-6">
                <div className="text-4xl mb-3">📷</div>
                <p className="text-gray-600 text-sm font-medium">
                  Foto {photo.id}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Klik untuk melihat
                </p>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                    <p className="text-gray-800 text-sm font-medium">Lihat Foto</p>
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
              
              {/* Photo placeholder */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 aspect-square rounded-xl flex items-center justify-center border-2 border-pink-200 mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-gray-600 font-medium">
                    Foto {selectedPhoto.id}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 max-w-xs">
                    Ganti dengan foto asli Mama dengan menyimpan file di folder public/photos/
                  </p>
                </div>
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

      {/* Instructions for adding real photos */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Cara Menambahkan Foto Asli:</h3>
        <div className="text-blue-700 space-y-2 text-sm">
          <p>1. Simpan foto-foto Mama di folder <code className="bg-blue-100 px-2 py-1 rounded">public/photos/</code></p>
          <p>2. Beri nama foto: <code className="bg-blue-100 px-2 py-1 rounded">mama-1.jpg</code>, <code className="bg-blue-100 px-2 py-1 rounded">mama-2.jpg</code>, dst.</p>
          <p>3. Edit file <code className="bg-blue-100 px-2 py-1 rounded">PhotoGallery.tsx</code> dan ganti placeholder dengan nama file asli</p>
          <p>4. Foto akan otomatis muncul di gallery! ✨</p>
        </div>
      </div>
    </div>
  );
}
