import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto max-w-3xl px-4 py-20 font-serif">
        <h1 className="mb-12 font-sans text-4xl font-bold uppercase tracking-tighter text-black md:text-5xl">
          Privacy Policy
        </h1>

        <div className="prose prose-lg prose-gray max-w-none">
          <p className="text-gray-500 italic mb-8">
            Terakhir diperbarui: 6 Januari 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              1. Informasi yang Kami Kumpulkan
            </h2>
            <p>
              Headroom Journal menghargai privasi Anda. Kami hanya mengumpulkan
              informasi yang diperlukan untuk meningkatkan pengalaman Anda di
              situs kami, seperti data analitik penggunaan situs melalui pihak
              ketiga (seperti Google Analytics).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              2. Cookies
            </h2>
            <p>
              Kami menggunakan cookies untuk memahami cara Anda berinteraksi
              dengan konten kami. Anda dapat mengatur browser Anda untuk menolak
              cookies, namun beberapa bagian dari situs mungkin tidak berfungsi
              sebagaimana mestinya.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              3. Keamanan Data
            </h2>
            <p>
              Kami mengambil langkah-langkah keamanan yang wajar untuk
              melindungi informasi Anda. Namun, perlu diingat bahwa tidak ada
              metode pengiriman data melalui internet yang 100% aman.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold font-sans text-black mb-4">
              4. Hubungi Kami
            </h2>
            <p>
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini,
              silakan hubungi kami di{" "}
              <a
                href="mailto:headroomjournal@gmail.com"
                className="text-blue-600 underline"
              >
                headroomjournal@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
