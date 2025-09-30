'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const targetDate = new Date('2025-09-30T00:00:00').getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Birthday has arrived!
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft(); // Initial calculation
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) {
    return (
      <div className='max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200'>
        <h2 className='text-3xl md:text-4xl font-bold mb-8 text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text'>
          ⏰ Countdown Ulang Tahun Mamah
        </h2>
        <div className='text-gray-600'>Loading countdown...</div>
      </div>
    );
  }

  const isTimeUp =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isTimeUp) {
    return (
      <div className='max-w-4xl mx-auto text-center bg-gradient-to-br from-pink-400 via-purple-400 to-rose-400 text-white rounded-2xl p-8 shadow-xl border-4 border-yellow-300'>
        <div className='text-6xl mb-4'>🎉🎂🎈</div>
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
          SELAMAT ULANG TAHUN MAMA!
        </h2>
        <p className='text-xl md:text-2xl'>
          Hari istimewa ini sudah tiba! 🥳✨
        </p>
        <div className='mt-6 text-4xl animate-bounce'>
          🎊 Happy Birthday! 🎊
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200'>
      <h2 className='text-3xl md:text-4xl font-bold mb-8 text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text'>
        ⏰ Countdown Ulang Tahun Mamah
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
        <div className='bg-gradient-to-br from-pink-100 to-pink-200 p-4 md:p-6 rounded-xl shadow-lg border border-pink-300 hover:scale-105 transition-transform duration-300'>
          <div className='text-3xl md:text-5xl font-bold text-pink-600 mb-2'>
            {timeLeft.days}
          </div>
          <div className='text-sm md:text-lg font-semibold text-pink-800'>
            {timeLeft.days === 1 ? 'Hari' : 'Hari'}
          </div>
        </div>

        <div className='bg-gradient-to-br from-purple-100 to-purple-200 p-4 md:p-6 rounded-xl shadow-lg border border-purple-300 hover:scale-105 transition-transform duration-300'>
          <div className='text-3xl md:text-5xl font-bold text-purple-600 mb-2'>
            {timeLeft.hours}
          </div>
          <div className='text-sm md:text-lg font-semibold text-purple-800'>
            {timeLeft.hours === 1 ? 'Jam' : 'Jam'}
          </div>
        </div>

        <div className='bg-gradient-to-br from-rose-100 to-rose-200 p-4 md:p-6 rounded-xl shadow-lg border border-rose-300 hover:scale-105 transition-transform duration-300'>
          <div className='text-3xl md:text-5xl font-bold text-rose-600 mb-2'>
            {timeLeft.minutes}
          </div>
          <div className='text-sm md:text-lg font-semibold text-rose-800'>
            {timeLeft.minutes === 1 ? 'Menit' : 'Menit'}
          </div>
        </div>

        <div className='bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 md:p-6 rounded-xl shadow-lg border border-indigo-300 hover:scale-105 transition-transform duration-300'>
          <div className='text-3xl md:text-5xl font-bold text-indigo-600 mb-2'>
            {timeLeft.seconds}
          </div>
          <div className='text-sm md:text-lg font-semibold text-indigo-800'>
            {timeLeft.seconds === 1 ? 'Detik' : 'Detik'}
          </div>
        </div>
      </div>

      <div className='mt-8 text-gray-700'>
        <p className='text-lg md:text-xl'>
          Menuju hari istimewa Mamah tercinta! 💕
        </p>
        <p className='text-sm md:text-base mt-2 text-gray-600'>
          30 September 2025 • Hari yang ditunggu-tunggu
        </p>
      </div>
    </div>
  );
}
