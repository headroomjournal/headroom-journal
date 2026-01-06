# Headroom Journal

Headroom Journal adalah media independen yang mendokumentasikan musik, ruang, dan manusia. Kami menulis tentang bunyi yang terjadi di luar sorotan utama sebagai catatan, arsip, dan refleksi.

## Fitur Utama

- **Integrasi Sanity CMS**: Manajemen konten artikel secara dinamis melalui dashboard yang intuitif.
- **Eksplorasi Kategori**: Navigasi dan filter artikel berdasarkan kategori utama: **Art**, **Pop Culture**, dan **Music**.
- **Fitur Pencarian**: Pencarian artikel global berdasarkan judul, kutipan, maupun konten.
- **Storytelling Visual**: Dukungan gambar berkualitas tinggi dengan atribusi sumber/kredit gambar.
- **Multimedia**: Integrasi Spotify Embed untuk pengalaman audio-visual dalam artikel.
- **Desain Responsif**: Antarmuka modern yang dioptimalkan untuk perangkat mobile dan desktop.
- **Halaman Legal**: Dilengkapi dengan halaman Privacy Policy dan Terms of Use yang terintegrasi.

## Teknologi

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS.
- **Backend/CMS**: Sanity.io.
- **UI Components**: Lucide React Icons, @portabletext/react.
- **Typography**: @tailwindcss/typography.

## Pengembangan

### Prasyarat

- Node.js & npm
- Akun Sanity.io

### Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/indraprhmbd/headroom-journal.git
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Konfigurasi Environment Variables:
   Buat file `.env.local` dan tambahkan kredensial Sanity Anda:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

### Sanity Studio

Akses dashboard manajemen konten di `/studio` pada server lokal Anda (misal: `http://localhost:3000/studio`).

---

Built with pride for **Headroom Journal**.
