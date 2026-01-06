import Link from "next/link";
import { slugify } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="mb-6 block font-sans text-2xl font-bold tracking-tighter text-black"
            >
              headroom journal
            </Link>
            <p className="max-w-sm font-serif text-sm leading-relaxed text-gray-500">
              Headroom Journal adalah media independen yang mendokumentasikan
              musik, ruang, dan manusia. Kami menulis tentang bunyi yang terjadi
              di luar sorotan utama sebagai catatan, arsip, dan refleksi.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
              Platform
            </h4>
            <ul className="space-y-4">
              {["Art", "Pop Culture", "Music"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/category/${slugify(item)}`}
                    className="font-serif text-sm text-gray-600 hover:text-black hover:underline underline-offset-4"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://instagram.com/headroomjournal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-sm text-gray-600 hover:text-black hover:underline underline-offset-4"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <a
                  href="mailto:headroomjournal@gmail.com"
                  className="font-serif text-sm text-gray-600 hover:text-black hover:underline underline-offset-4"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row md:items-center">
          <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
            © {new Date().getFullYear()} Headroom Journal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-sans text-[10px] uppercase tracking-widest text-gray-400 hover:text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-[10px] uppercase tracking-widest text-gray-400 hover:text-black"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
