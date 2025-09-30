'use client';


import { useState, useRef, useEffect } from 'react';
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom';
import Image from 'next/image';

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  filename?: string; // Optional untuk foto yang di-upload
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
    src: '/photos/mom-me.png',
    alt: 'Mama dan aku',
    caption: 'Kenangan indah bersama Mama tercinta 💕',
  },
  {
    id: 3,
    src: '/photos/best-mom.png',
    alt: 'Mama terbaik di dunia',
    caption: 'Mama terbaik di dunia! Terima kasih untuk segalanya 👑',
  },
  {
    id: 4,
    src: '/photos/mom-fams.png',
    alt: 'Keluarga berkumpul',
    caption: 'Kebersamaan keluarga yang tak ternilai 👨‍👩‍👧‍👦',
  },
  {
    id: 5,
    src: '/photos/mom-past-bday.jpg',
    alt: 'Ulang tahun sebelumnya',
    caption: 'Ulang tahun tahun lalu yang tak terlupakan 🎂',
  },
  {
    id: 6,
    src: '/photos/mom-children.png',
    alt: 'Mama dan anak-anak',
    caption: 'Mama dan anak-anaknya yang bahagia 🥰',
  },
];


export default function PhotoGallery() {
  const [uploadedPhoto, setUploadedPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Key untuk localStorage


  // Load foto dari server saat komponen mount
  useEffect(() => {
    const loadPhotoFromServer = async () => {
      try {
        const response = await fetch('/api/photos');
        const result = await response.json();
        
        if (result.success && result.photo) {
          // Konversi data server ke format Photo interface
          const serverPhoto = {
            id: 999,
            src: result.photo.url,
            alt: 'Foto hari ini',
            caption: 'Foto spesial hari ini 🎉',
            filename: result.photo.filename
          };
          setUploadedPhoto(serverPhoto);
        } else {
          // Tidak ada foto di server
          setUploadedPhoto(null);
        }
      } catch (error) {
        console.error('Error loading photo from server:', error);
        setUploadedPhoto(null);
      }
    };

    loadPhotoFromServer();
  }, []);



  // Fungsi hapus file dari server
  const deletePhotoFromServer = async (filename: string): Promise<boolean> => {
    console.log('Attempting to delete photo:', filename);
    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });

      const result = await response.json();
      console.log('Delete API response:', result);
      
      if (response.ok && result.success) {
        console.log('Photo deleted successfully:', filename);
        return true;
      } else {
        console.error('Delete error:', result.error);
        setError(`Gagal hapus foto: ${result.error}`);
        return false;
      }
    } catch (error) {
      console.error('Delete request error:', error);
      setError('Gagal menghapus foto dari server');
      return false;
    }
  };



  // Handler upload ke server
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validasi client-side
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran gambar maksimal 5MB');
      return;
    }

    try {
      // Hapus foto lama jika ada (saat edit/ganti)
      if (uploadedPhoto && uploadedPhoto.filename) {
        const deleteSuccess = await deletePhotoFromServer(uploadedPhoto.filename);
        if (!deleteSuccess) {
          setError('Gagal menghapus foto lama. Upload dibatalkan.');
          return;
        }
      }

      // Upload ke server
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Gagal upload file');
        return;
      }

      // Simpan info foto yang berhasil di-upload
      const newPhoto = {
        id: 999, // id khusus untuk upload hari ini
        src: result.url, // URL file di server
        alt: 'Foto hari ini',
        caption: 'Foto spesial hari ini 🎉',
        filename: result.filename, // Simpan filename untuk referensi
      };

      setUploadedPhoto(newPhoto);
      setError(null);

    } catch (error) {
      console.error('Upload error:', error);
      setError('Gagal upload file. Silakan coba lagi.');
    }
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text'>
        📸 Gallery Kenangan Bersama Mama
      </h2>

      {/* Foto Hari Ini - Section Terpisah dengan ukuran besar */}
      <div className='mb-12 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-yellow-200'>
        <h3 className='text-2xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text'>
          🌟 Foto Spesial Hari Ini (30 September 2025)
        </h3>
        
        {!uploadedPhoto ? (
          // Upload area
          <div className='flex flex-col items-center'>
            <div 
              className='w-full max-w-md aspect-square border-2 border-dashed border-yellow-300 rounded-xl flex flex-col items-center justify-center bg-white/70 hover:bg-yellow-50/70 transition-colors cursor-pointer mb-4'
              onClick={() => fileInputRef.current?.click()}
            >
              <div className='text-6xl mb-4'>📷</div>
              <p className='text-lg font-semibold text-yellow-700 mb-2'>Upload foto celebration hari ini!</p>
              <p className='text-sm text-yellow-600'>Klik untuk pilih foto</p>
            </div>
            
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className='hidden'
            />
            {error && <p className='text-red-500 mt-2 text-center'>{error}</p>}
          </div>
        ) : (
          // Display uploaded photo with edit option
          <div className='flex flex-col items-center'>
            <div className='relative w-full max-w-lg aspect-square mb-4'>
              <ImageZoom>
                <Image
                  src={uploadedPhoto.src}
                  alt={uploadedPhoto.alt}
                  width={600}
                  height={600}
                  className='w-full h-full object-cover rounded-xl shadow-lg border-2 border-yellow-300'
                />
              </ImageZoom>
              
              {/* Edit and Delete button overlays */}
              <div className='absolute top-4 right-4 flex gap-2'>
                <button
                  onClick={() => {
                    setError(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                  className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors'
                >
                  ✏️ Ganti
                </button>
                <button
                  onClick={async () => {
                    console.log('Delete button clicked');
                    console.log('Current uploadedPhoto:', uploadedPhoto);
                    if (confirm('Yakin ingin hapus foto hari ini? Foto akan hilang permanen dari server.')) {
                      console.log('User confirmed deletion');
                      setError(null);
                      
                      // Hapus file dari server
                      if (uploadedPhoto && uploadedPhoto.filename) {
                        console.log('Deleting photo with filename:', uploadedPhoto.filename);
                        const deleteSuccess = await deletePhotoFromServer(uploadedPhoto.filename);
                        
                        if (deleteSuccess) {
                          // Clear state hanya jika berhasil hapus dari server
                          console.log('Photo deleted successfully, clearing state');
                          setUploadedPhoto(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        } else {
                          console.log('Failed to delete photo');
                        }
                      } else {
                        // Tidak ada filename, langsung clear state
                        console.log('No filename found, clearing state anyway');
                        setUploadedPhoto(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }
                    } else {
                      console.log('User cancelled deletion');
                    }
                  }}
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors'
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
            
            <div className='text-center'>
              <p className='text-xl font-bold text-yellow-700 mb-2'>{uploadedPhoto.caption}</p>
              <p className='text-yellow-600 mb-2'>Foto indah dari celebration hari ini! 🎉</p>
              <div className='space-y-1'>
                <p className='text-green-600 text-sm'>✅ Foto tersimpan permanen di server</p>
                <p className='text-blue-600 text-xs'>📁 Location: public/uploads/today/</p>
                {uploadedPhoto.filename && (
                  <p className='text-gray-500 text-xs'>📄 File: {uploadedPhoto.filename}</p>
                )}
              </div>
            </div>
            
            {/* Hidden input for re-upload */}
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className='hidden'
            />
          </div>
        )}
      </div>

      {/* Gallery Kenangan - Section Terpisah */}
      <div className='bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-pink-200'>
        <h3 className='text-2xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text'>
          💕 Gallery Kenangan Indah
        </h3>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {mamaPhotos.map((photo) => (
            <div key={photo.id} className='group'>
              <div className='relative overflow-hidden rounded-xl shadow-lg aspect-square border-2 border-pink-200 hover:border-pink-300 transition-all duration-300 group-hover:scale-105 bg-pink-50'>
                {/* Using shadcn ImageZoom with Next.js Image - most reliable approach */}
                <ImageZoom>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={400}
                    className='w-full h-full object-contain rounded-xl'
                    priority={photo.id <= 2}
                    onLoad={() =>
                      console.log('✅ Shadcn Image loaded:', photo.src)
                    }
                    onError={() =>
                      console.error('❌ Shadcn Image failed:', photo.src)
                    }
                  />
                </ImageZoom>

                {/* Zoom hint overlay */}
                <div className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                  <div className='bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-800'>
                    🔍 Klik untuk zoom
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className='mt-3 text-center'>
                <p className='text-gray-700 text-sm font-medium'>
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
