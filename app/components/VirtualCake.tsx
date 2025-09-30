'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VirtualCake() {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const blowCandle = (index: number) => {
    const newCandlesLit = [...candlesLit];
    newCandlesLit[index] = false;
    setCandlesLit(newCandlesLit);

    // Check if all candles are blown out
    const allBlownOut = newCandlesLit.every((candle) => !candle);
    if (allBlownOut && !wishMade) {
      setShowCelebration(true);
      setWishMade(true);
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
    }
  };

  const lightAllCandles = () => {
    setCandlesLit([true, true, true]);
    setShowCelebration(false);
    setWishMade(false);
  };

  const blowAllCandles = () => {
    setCandlesLit([false, false, false]);
    if (!wishMade) {
      setShowCelebration(true);
      setWishMade(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  return (
    <div className='max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200 relative'>
      {/* Celebration overlay */}
      {showCelebration && (
        <div className='absolute inset-0 bg-gradient-to-br from-yellow-200/90 to-orange-200/90 rounded-2xl flex items-center justify-center z-10'>
          <div className='text-center'>
            {/* Foto Agung di celebration */}
            <div className='mb-6 flex justify-center'>
              <div className='relative w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl animate-pulse bg-white/20'>
                <Image
                  src='/photos/agung.png' // Foto Agung
                  alt='Agung'
                  width={320}
                  height={320}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
            <div className='text-6xl mb-4 animate-bounce'>🎉</div>
            <h3 className='text-2xl md:text-3xl font-bold text-orange-800 mb-2'>
              Aamiin Ya Rabbal Alamiin! ✨
            </h3>
            <p className='text-lg text-orange-700'>
              Semoga doa Agung untuk Mama dikabulkan Allah SWT! 🙏
            </p>
            <p className='text-sm text-orange-600 mt-2 italic'>
              - Dengan cinta dari Agung 💝
            </p>
          </div>
        </div>
      )}

      <h2 className='text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text'>
        🎂 Kue Ulang Tahun Virtual dari Agung
      </h2>

      <div className='relative inline-block mb-8'>
        {/* Cake base */}
        <div className='flex justify-center mb-4'>
          <Image
            src='/cake.svg'
            alt='Birthday Cake'
            width={200}
            height={200}
            className='w-80 h-80 md:w-102 md:h-102'
          />
        </div>

        {/* Candles - 3 lilin sesuai permintaan */}
        <div className='absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-4'>
          {candlesLit.map((isLit, index) => (
            <button
              key={index}
              onClick={() => blowCandle(index)}
              className={`text-4xl md:text-5xl hover:scale-110 transition-all duration-300 ${
                isLit ? 'animate-pulse' : ''
              }`}
              title={
                isLit
                  ? `Tiup lilin ${index + 1}`
                  : `Lilin ${index + 1} sudah padam`
              }>
              {isLit ? '🕯️' : '💨'}
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-4'>
        <p className='text-lg text-gray-700 mb-6'>
          {candlesLit.every((candle) => !candle)
            ? 'Semua lilin sudah padam! Agung ikut mendoakan dari jauh agar semua permintaan Mama dikabulkan 💫'
            : 'Meskipun Agung ga bisa tiup lilin bareng Mama, semoga kue virtual ini bisa sedikit menghibur... Klik lilin untuk meniupnya!'}
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={blowAllCandles}
            disabled={candlesLit.every((candle) => !candle)}
            className='px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'>
            💨 Tiup Semua Lilin
          </button>

          <button
            onClick={lightAllCandles}
            className='px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300'>
            🔥 Nyalakan Semua Lilin
          </button>
        </div>
      </div>

      {/* Birthday wishes */}
      <div className='mt-8 p-4 bg-pink-50 rounded-xl border border-pink-200'>
        <h3 className='text-lg font-semibold text-pink-800 mb-3'>
          💝 Doa Agung untuk Mama
        </h3>
        <div className='text-sm text-pink-700 space-y-2'>
          <p>• Ya Allah, berikan kesehatan dan kekuatan untuk Mama</p>
          <p>• Semoga Mama selalu dalam lindungan dan rahmat-Mu</p>
          <p>• Bahagiakan Mama meski Agung tidak bisa selalu di sisi</p>
          <p>• Panjangkan umur Mama dengan keberkahan</p>
          <p>• Maafkan Agung yang tidak bisa hadir di hari istimewa ini</p>
        </div>
      </div>
    </div>
  );
}
