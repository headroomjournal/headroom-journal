"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navItems = ["Art", "Pop Culture", "Music"];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white transition-all duration-300",
          isScrolled ? "border-b border-gray-100 py-3" : "py-6"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-sans text-2xl font-bold tracking-tighter text-black md:text-3xl"
            onClick={() => setIsMenuOpen(false)}
          >
            headroom journal
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/category/${item.toLowerCase()}`}
                className="font-sans text-sm font-medium uppercase tracking-wider text-gray-600 transition-colors hover:text-black"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Search"
            >
              {isSearchOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Search className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed left-0 top-[73px] z-40 w-full border-b border-gray-100 bg-white px-4 py-8 shadow-sm transition-all duration-300">
          <div className="container mx-auto max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b-2 border-gray-200 py-2 pl-2 pr-10 font-serif text-2xl text-black placeholder-gray-300 outline-none focus:border-black"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <Search className="h-6 w-6 text-gray-400 hover:text-black" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[73px] z-40 bg-white px-4 pt-10 md:hidden">
          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/category/${item.toLowerCase()}`}
                className="border-b border-gray-100 pb-4 font-sans text-2xl font-bold uppercase tracking-tight text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
