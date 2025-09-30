# 🚀 Panduan Deployment Website Ulang Tahun Mamah

## Opsi 1: Deploy ke Vercel (Tercepat & Gratis)

### Langkah-langkah:

1. **Upload ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "🎂 Website ulang tahun mama siap!"
   git branch -M main
   git remote add origin https://github.com/username/ultah-mamah.git
   git push -u origin main
   ```

2. **Deploy ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Sign up/Login dengan GitHub
   - Klik "New Project"
   - Import repository "ultah-mamah" 
   - Klik "Deploy"
   - **Website siap dalam 2-3 menit!** 🎉

3. **Custom Domain (Opsional)**
   - Di Vercel dashboard → Settings → Domains
   - Add custom domain jika punya

---

## Opsi 2: Deploy ke Netlify (Alternatif)

1. **Upload file ke Netlify**
   - Kunjungi [netlify.com](https://netlify.com)
   - Drag & drop folder project ke "Deploy" area
   - Website langsung live!

---

## 📱 Setelah Deploy

### Tes di berbagai device:
- [ ] Desktop/Laptop
- [ ] Tablet  
- [ ] Mobile phone
- [ ] Share link ke keluarga untuk testing

### Fitur yang harus dicek:
- [ ] Countdown timer berjalan
- [ ] Virtual cake bisa ditiup lilinnya
- [ ] Gallery foto bisa dibuka
- [ ] Website responsive di semua ukuran layar

---

## 📷 Mengganti dengan Foto Asli

**Setelah website live, untuk mengganti placeholder dengan foto mama:**

1. **Siapkan foto** (format JPG/PNG, max 2MB per foto)
2. **Upload ke GitHub:**
   - Masuk ke repository GitHub
   - Klik folder `public/photos/`
   - Upload foto dengan nama: `mama-1.jpg`, `mama-2.jpg`, dll.
   
3. **Edit PhotoGallery.tsx:**
   ```typescript
   // Ganti ini:
   src: '/photos/placeholder-1.jpg'
   
   // Jadi ini:
   src: '/photos/mama-1.jpg'
   ```
   
4. **Commit & Push** - Vercel akan auto-deploy update!

---

## 🎨 Kustomisasi Cepat

### Ganti ucapan:
Edit file `app/page.tsx` bagian:
```typescript
<h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
  Terima kasih sudah menjadi Mamah terbaik di dunia!  // ← Edit disini
</h2>
```

### Ganti tanggal:
Edit file `app/components/CountdownTimer.tsx`:
```typescript
const targetDate = new Date('2025-09-30T00:00:00').getTime();  // ← Ubah tanggal
```

---

## ✅ Checklist Final

- [ ] Website berhasil deploy dan bisa diakses
- [ ] Semua komponen berfungsi (countdown, cake, gallery)
- [ ] Responsive di mobile dan desktop
- [ ] Link sudah dishare ke keluarga
- [ ] Foto placeholder sudah diganti (opsional)
- [ ] Ucapan sudah disesuaikan

---

## 🆘 Troubleshooting

**Problem**: Build error saat deploy
**Solution**: Pastikan semua files ada di GitHub dan tidak ada typo

**Problem**: Countdown tidak update
**Solution**: Check timezone browser, countdown menghitung ke UTC

**Problem**: Foto tidak muncul
**Solution**: Pastikan nama file foto sesuai dengan yang di code

---

## 🎉 Selesai!

Website ulang tahun mama sudah siap dan bisa diakses dari mana saja! 

**Share link website ke semua keluarga dan siap-siap merayakan ulang tahun mama besok! 🎂💕**

---

*Butuh bantuan? Contact developer yang bikin website ini! 😊*
