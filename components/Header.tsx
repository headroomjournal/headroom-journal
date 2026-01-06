"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        >
          headroom journal
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {["Art", "Pop Culture", "Music"].map((item) => (
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
          <button className="rounded-full p-2 hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-700" />
          </button>
          <button className="md:hidden rounded-full p-2 hover:bg-gray-100 transition-colors">
            <Menu className="h-6 w-6 text-black" />
          </button>
        </div>
      </div>
    </header>
  );
}
