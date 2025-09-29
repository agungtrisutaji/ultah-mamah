'use client';

import CountdownTimer from './components/CountdownTimer';
import VirtualCake from './components/VirtualCake';
import PhotoGallery from './components/PhotoGallery';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100'>
      {/* Floating hearts animation */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-10 left-10 text-pink-300 text-xl animate-bounce delay-300'>
          💕
        </div>
        <div className='absolute top-20 right-20 text-rose-300 text-2xl animate-bounce delay-700'>
          ❤️
        </div>
        <div className='absolute bottom-32 left-20 text-purple-300 text-lg animate-bounce delay-1000'>
          💖
        </div>
        <div className='absolute bottom-20 right-32 text-pink-400 text-xl animate-bounce delay-500'>
          💝
        </div>
      </div>

      <div className='container mx-auto px-4 py-8 relative z-10'>
        {/* Header */}
        <div className='text-center mb-12 pt-8'>
          <div className='text-6xl mb-4 animate-pulse'>🎉</div>
          <h1 className='text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text mb-4 leading-tight'>
            Selamat Ulang Tahun
            <br />
            <span className='text-5xl md:text-7xl'>Mama Tersayang! 🎂</span>
          </h1>
          <div className='text-lg md:text-xl text-gray-700 mb-4'>
            <div className='flex items-center justify-center gap-2 mb-2'>
              <span className='text-2xl'>📅</span>
              <span className='font-semibold'>30 September 2025</span>
            </div>
            <p className='text-gray-600'>Hari Spesial untuk Orang Terspesial</p>
          </div>
        </div>

        {/* Main Birthday Message */}
        <div className='max-w-3xl mx-auto text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-12 border border-pink-200'>
          <div className='text-5xl mb-6'>🌟</div>
          <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-6'>
            Maaf anak Mama tidak bisa pulang untuk merayakan hari istimewa ini...
          </h2>
          <div className='text-gray-700 leading-relaxed space-y-4'>
            <p className='text-lg'>
              Meskipun jarak memisahkan kita, cinta dan rasa terima kasih anak Mama tidak pernah pudar. 
              Pekerjaan mungkin membuat anak jarang pulang, tapi Mama selalu ada di hati dan pikiran anak setiap hari.
            </p>
            <p className='text-lg'>
              Pengorbanan Mama membesarkan anak, kesabaran Mama menghadapi tingkah anak, 
              dan doa-doa Mama yang tak pernah putus adalah kekuatan terbesar dalam hidup anak.
            </p>
            <p className='text-lg'>
              Di hari istimewa ini, anak berdoa semoga Allah selalu melindungi Mama, 
              memberikan kesehatan, kebahagiaan, dan umur yang panjang.
            </p>
            <p className='text-xl font-semibold text-pink-600'>
              Maafkan anak yang tidak bisa hadir... Tapi cinta anak untuk Mama tak terbatas! 💕✨
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12'>
          <div className='text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-pink-100'>
            <div className='text-3xl mb-2'>🎈</div>
            <div className='text-2xl font-bold text-purple-600'>Tahun Ke-</div>
            <div className='text-lg text-gray-600'>Semoga Panjang Umur</div>
          </div>

          <div className='text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100'>
            <div className='text-3xl mb-2'>✈️</div>
            <div className='text-2xl font-bold text-rose-600'>Jarak Jauh</div>
            <div className='text-lg text-gray-600'>Tapi Hati Selalu Dekat</div>
          </div>

          <div className='text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-rose-100'>
            <div className='text-3xl mb-2'>🤲</div>
            <div className='text-2xl font-bold text-pink-600'>Doa Setiap Hari</div>
            <div className='text-lg text-gray-600'>Untuk Kebaikan Mama</div>
          </div>
        </div>

        {/* Interactive Components Section */}
        <div className='space-y-12'>
          {/* Countdown Timer */}
          <section id='countdown'>
            <CountdownTimer />
          </section>

          {/* Virtual Cake */}
          <section id='cake'>
            <VirtualCake />
          </section>

          {/* Photo Gallery */}
          <section id='gallery'>
            <PhotoGallery />
          </section>
        </div>

        {/* Footer */}
        <div className='text-center mt-16 pt-8 border-t border-pink-200'>
          <p className='text-gray-600 text-lg'>
            Made with ❤️ by your child who misses you every day
          </p>
          <p className='text-gray-500 text-sm mt-2'>
            Meskipun jauh, cinta untuk Mama tak pernah berkurang • September 2025
          </p>
        </div>
      </div>
    </main>
  );
}
