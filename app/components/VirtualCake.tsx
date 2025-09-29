'use client';

import { useState } from 'react';

export default function VirtualCake() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const blowCandle = (index: number) => {
    const newCandlesLit = [...candlesLit];
    newCandlesLit[index] = false;
    setCandlesLit(newCandlesLit);

    // Check if all candles are blown out
    const allBlownOut = newCandlesLit.every(candle => !candle);
    if (allBlownOut && !wishMade) {
      setShowCelebration(true);
      setWishMade(true);
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  const lightAllCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setShowCelebration(false);
    setWishMade(false);
  };

  const blowAllCandles = () => {
    setCandlesLit([false, false, false, false, false]);
    if (!wishMade) {
      setShowCelebration(true);
      setWishMade(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200 relative">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/90 to-orange-200/90 rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl md:text-3xl font-bold text-orange-800 mb-2">
              Selamat! Permintaan Terkabul! ✨
            </h3>
            <p className="text-lg text-orange-700">
              Semoga semua doa untuk Mama dikabulkan! 🙏
            </p>
          </div>
        </div>
      )}

      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text">
        🎂 Kue Ulang Tahun Virtual untuk Mama
      </h2>

      <div className="relative inline-block mb-8">
        {/* Cake base */}
        <div className="text-8xl md:text-9xl mb-4">🎂</div>
        
        {/* Candles */}
        <div className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2">
          {candlesLit.map((isLit, index) => (
            <button
              key={index}
              onClick={() => blowCandle(index)}
              className={`text-2xl md:text-3xl hover:scale-110 transition-all duration-300 ${
                isLit ? 'animate-pulse' : ''
              }`}
              title={isLit ? `Tiup lilin ${index + 1}` : `Lilin ${index + 1} sudah padam`}
            >
              {isLit ? '🕯️' : '💨'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-lg text-gray-700 mb-6">
          {candlesLit.every(candle => !candle) 
            ? "Semua lilin sudah padam! Pasti Mama sudah membuat permintaan yang indah 💫"
            : "Klik lilin untuk meniupnya, atau tiup semua sekaligus!"
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={blowAllCandles}
            disabled={candlesLit.every(candle => !candle)}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            💨 Tiup Semua Lilin
          </button>
          
          <button
            onClick={lightAllCandles}
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            🔥 Nyalakan Semua Lilin
          </button>
        </div>
      </div>

      {/* Birthday wishes */}
      <div className="mt-8 p-4 bg-pink-50 rounded-xl border border-pink-200">
        <h3 className="text-lg font-semibold text-pink-800 mb-3">💝 Permintaan Ulang Tahun</h3>
        <div className="text-sm text-pink-700 space-y-2">
          <p>• Kesehatan yang selalu prima untuk Mama</p>
          <p>• Kebahagiaan yang tak pernah surut</p>
          <p>• Umur panjang dan berkah berlimpah</p>
          <p>• Selalu dalam lindungan dan rahmat Tuhan</p>
        </div>
      </div>
    </div>
  );
}
