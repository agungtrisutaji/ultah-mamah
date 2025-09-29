'use client';

import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom';
import Image from 'next/image';

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
  return (
    <div className='max-w-6xl mx-auto'>
      <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text'>
        📸 Gallery Kenangan Bersama Mama
      </h2>

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

      {/* Photo information */}
      {/* <div className='mt-12 bg-green-50 border border-green-200 rounded-xl p-6'>
        <h3 className='text-lg font-semibold text-green-800 mb-3'>
          � Kenangan Indah Bersama Mama
        </h3>
        <p className='text-green-700 text-sm'>
          Setiap foto ini menyimpan kenangan berharga yang tak akan pernah
          terlupakan. Meski jarak memisahkan, cinta dan kerinduan untuk Mama
          tetap sama. ✨
        </p>
      </div> */}
    </div>
  );
}
