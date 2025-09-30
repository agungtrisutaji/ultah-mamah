# 🎂 Website Ulang Tahun Mamah Tersayang

Website ulang tahun interaktif yang dibuat dengan ❤️ untuk mama tercinta menggunakan Next.js 15.5.4 dan Tailwind CSS.

## ✨ Fitur-Fitur

- **🎉 Halaman Ucapan Utama** - Ucapan ulang tahun yang indah dengan animasi floating hearts
- **⏰ Countdown Timer** - Hitung mundur menuju hari ulang tahun (30 September 2025)
- **🎂 Virtual Birthday Cake** - Kue virtual interaktif dengan lilin yang bisa ditiup
- **📸 Photo Gallery** - Gallery foto kenangan (dengan placeholder untuk foto asli)
- **📱 Responsive Design** - Terlihat cantik di semua device

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka http://localhost:3000 di browser
```

## 📷 Cara Menambahkan Foto Asli

1. Simpan foto-foto mama di folder `public/photos/`
2. Beri nama file: `mama-1.jpg`, `mama-2.jpg`, dst.
3. Edit file `app/components/PhotoGallery.tsx` dan update array `placeholderPhotos`
4. Ganti `src: '/photos/placeholder-X.jpg'` dengan `src: '/photos/mama-X.jpg'`

## 🎨 Kustomisasi

- **Warna tema**: Edit gradients di `app/page.tsx` dan komponen lainnya
- **Pesan ucapan**: Edit teks di `app/page.tsx`
- **Tanggal ulang tahun**: Edit di `app/components/CountdownTimer.tsx`

## 📦 Deployment

Website ini siap untuk deploy ke:
- ✅ Vercel (Recommended)
- ✅ Netlify  
- ✅ Firebase Hosting

### Deploy ke Vercel:
1. Push code ke GitHub
2. Connect GitHub repo ke Vercel
3. Deploy automatically! 🚀

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: Vercel

## 💝 Dibuat dengan Cinta

Website ini dibuat khusus untuk merayakan hari istimewa mama tercinta. Semoga mama suka! 

**Happy Birthday, Ma! 🎉🎂❤️**

---

*Made with ❤️ by your loving children • September 2025*
