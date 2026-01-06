import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto max-w-3xl px-4 py-20 font-serif">
        <h1 className="mb-12 font-sans text-4xl font-bold uppercase tracking-tighter text-black md:text-5xl">
          Terms of Use
        </h1>

        <div className="prose prose-lg prose-gray max-w-none">
          <p className="text-gray-500 italic mb-8">
            Terakhir diperbarui: 6 Januari 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              1. Penerimaan Ketentuan
            </h2>
            <p>
              Dengan mengakses dan menggunakan Headroom Journal, Anda setuju
              untuk terikat oleh ketentuan penggunaan ini dan semua hukum serta
              peraturan yang berlaku.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              2. Hak Kekayaan Intelektual
            </h2>
            <p>
              Semua konten yang dipublikasikan di Headroom Journal, termasuk
              teks, gambar, dan logo, adalah milik Headroom Journal atau pemberi
              lisensinya kecuali dinyatakan lain. Konten tidak boleh
              direproduksi tanpa izin tertulis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              3. Batasan Tanggung Jawab
            </h2>
            <p>
              Konten di situs ini disediakan untuk tujuan informasi umum saja.
              Headroom Journal tidak bertanggung jawab atas kerugian atau
              kerusakan yang timbul dari penggunaan informasi di situs ini.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              4. Perubahan Ketentuan
            </h2>
            <p>
              Kami berhak untuk memperbarui ketentuan ini sewaktu-waktu.
              Penggunaan berkelanjutan Anda atas situs ini setelah perubahan
              tersebut merupakan penerimaan Anda terhadap ketentuan baru.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
