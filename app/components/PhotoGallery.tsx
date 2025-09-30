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

// Real photos of mama - Now hosted on Supabase Storage
const mamaPhotos: Photo[] = [
  {
    id: 1,
    src: 'https://zfyjvwctyvefzdcietpk.supabase.co/storage/v1/object/public/mama-photos/gallery/mom.png',
    alt: 'Mamah tersenyum',
    caption: 'Senyum Mamah yang selalu menghangatkan hati ☺️',
  },
  {
    id: 2,
    src: 'https://zfyjvwctyvefzdcietpk.supabase.co/storage/v1/object/public/mama-photos/gallery/mom-me.png',
    alt: 'Mamah dan aku',
    caption: 'Kenangan indah bersama Mamah tercinta 💕',
  },
  {
    id: 3,
    src: 'https://zfyjvwctyvefzdcietpk.supabase.co/storage/v1/object/public/mama-photos/gallery/best-mom.png',
    alt: 'Mamah terbaik di dunia',
    caption: 'Mamah terbaik di dunia! Terima kasih untuk segalanya 👑',
  },
  {
    id: 4,
    src: 'https://zfyjvwctyvefzdcietpk.supabase.co/storage/v1/object/public/mama-photos/gallery/mom-fams.png',
    alt: 'Keluarga berkumpul',
    caption: 'Kebersamaan keluarga yang tak ternilai 👨‍👩‍👧‍👦',
  },
  {
    id: 5,
    src: 'https://zfyjvwctyvefzdcietpk.supabase.co/storage/v1/object/public/mama-photos/gallery/mom-past-bday.jpg',
    alt: 'Ulang tahun sebelumnya',
    caption: 'Ulang tahun tahun lalu yang tak terlupakan 🎂',
  },
  {
    id: 6,
    src: 'https://zfyjvwctyvefzdcietpk.supabase.co/storage/v1/object/public/mama-photos/gallery/mom-children.png',
    alt: 'Mamah dan anak-anak',
    caption: 'Mamah dan anak-anaknya yang bahagia 🥰',
  },
];

export default function PhotoGallery() {
  const [uploadedPhoto, setUploadedPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [pendingAction, setPendingAction] = useState<
    'upload' | 'delete' | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Key untuk localStorage

  // Load foto dari server saat komponen mount
  useEffect(() => {
    const loadPhotoFromServer = async () => {
      try {
        console.log('🔄 Loading photo from server...');
        const response = await fetch('/api/photos');
        const result = await response.json();
        console.log('📡 Server response:', result);

        if (result.success && result.photo && result.photo.url) {
          // Konversi data server ke format Photo interface
          const serverPhoto = {
            id: 999,
            src: result.photo.url,
            alt: 'Foto hari ini',
            caption: 'Foto spesial hari ini 🎉',
            filename: result.photo.filename,
          };
          console.log('✅ Setting uploaded photo:', serverPhoto);
          setUploadedPhoto(serverPhoto);
        } else {
          // Tidak ada foto di server
          console.log('ℹ️ No photo found on server');
          setUploadedPhoto(null);
        }
      } catch (error) {
        console.error('❌ Error loading photo from server:', error);
        setUploadedPhoto(null);
      }
    };

    loadPhotoFromServer();
  }, []);

  // Password verification
  const CORRECT_PASSWORD = 'mama582025'; // Password untuk akses foto

  const verifyPassword = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      setShowPasswordModal(false);
      setPasswordInput('');

      // Execute pending action
      if (pendingAction === 'upload' && fileInputRef.current) {
        fileInputRef.current.click();
      } else if (pendingAction === 'delete' && uploadedPhoto?.filename) {
        executeDelete();
      }

      setPendingAction(null);
    } else {
      setError('Password salah! Coba lagi.');
      setPasswordInput('');
    }
  };

  const requestPassword = (action: 'upload' | 'delete') => {
    setPendingAction(action);
    setShowPasswordModal(true);
    setError(null);
  };

  // Execute delete after password verification
  const executeDelete = async () => {
    if (!uploadedPhoto?.filename) return;

    const deleteSuccess = await deletePhotoFromServer(uploadedPhoto.filename);
    if (deleteSuccess) {
      setUploadedPhoto(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
        const deleteSuccess = await deletePhotoFromServer(
          uploadedPhoto.filename
        );
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

      console.log('✅ New photo uploaded successfully:', newPhoto);
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
        📸 Gallery Kenangan Bersama Mamah
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
              onClick={() => requestPassword('upload')}>
              <div className='text-6xl mb-4'>📷</div>
              <p className='text-lg font-semibold text-yellow-700 mb-2'>
                Upload foto celebration hari ini!
              </p>
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
                  key={uploadedPhoto.src} // Force re-render when URL changes
                  src={uploadedPhoto.src}
                  alt={uploadedPhoto.alt}
                  width={600}
                  height={600}
                  className='w-full h-full object-cover rounded-xl shadow-lg border-2 border-yellow-300'
                  onLoad={() =>
                    console.log('✅ Uploaded photo loaded:', uploadedPhoto.src)
                  }
                  onError={() =>
                    console.error(
                      '❌ Uploaded photo failed to load:',
                      uploadedPhoto.src
                    )
                  }
                />
              </ImageZoom>

              {/* Edit and Delete button overlays */}
              <div className='absolute top-4 right-4 flex gap-2'>
                <button
                  onClick={() => {
                    setError(null);
                    requestPassword('upload');
                  }}
                  className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors'>
                  ✏️ Ganti
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        'Yakin ingin hapus foto hari ini? Foto akan hilang permanen dari server.'
                      )
                    ) {
                      setError(null);
                      requestPassword('delete');
                    }
                  }}
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold shadow-lg transition-colors'>
                  🗑️ Hapus
                </button>
              </div>
            </div>

            <div className='text-center'>
              <p className='text-xl font-bold text-yellow-700 mb-2'>
                {uploadedPhoto.caption}
              </p>
              <p className='text-yellow-600 mb-2'>
                Foto indah dari celebration hari ini! 🎉
              </p>
              {/* <div className='space-y-1'>
                <p className='text-green-600 text-sm'>
                  ✅ Foto tersimpan permanen di server
                </p>
                {uploadedPhoto.filename && (
                  <p className='text-gray-500 text-xs'>
                    📄 File: {uploadedPhoto.filename}
                  </p>
                )}
              </div> */}
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

      {/* Password Modal */}
      {showPasswordModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 max-w-md w-full mx-4'>
            <h3 className='text-2xl font-bold text-center mb-6 text-gray-800'>
              🔐 Masukkan Password
            </h3>
            <p className='text-center text-gray-600 mb-6'>
              Password diperlukan untuk{' '}
              {pendingAction === 'upload' ? 'upload/edit' : 'hapus'} foto hari
              ini
            </p>

            <div className='space-y-4'>
              <input
                type='password'
                placeholder='Masukkan password...'
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && verifyPassword()}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
                autoFocus
              />

              {error && (
                <p className='text-red-500 text-sm text-center'>{error}</p>
              )}

              <div className='flex gap-3 pt-4'>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordInput('');
                    setPendingAction(null);
                    setError(null);
                  }}
                  className='flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-colors'>
                  Batal
                </button>
                <button
                  onClick={verifyPassword}
                  className='flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition-colors'>
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
