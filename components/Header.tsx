"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = ["home", "about", "services"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      if (pathname !== "/") return;

      const scrollPosition = window.scrollY + 150;
      let currentSection = "";

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (!element) return;

        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + height
        ) {
          currentSection = section;
        }
      });

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (item: string) => {
    if (pathname === "/" && sections.includes(item)) {
      return active === item;
    }
    if (pathname === `/${item}`) return true;
    return false;
  };

  const linkStyle = (item: string) =>
    `px-4 py-2 text-sm rounded-full transition ${
      isActive(item)
        ? "bg-zinc-700 shadow-sm shadow-zinc-600/50 text-zinc-50"
        : "hover:bg-white/10"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6">
      <div
        className={`
          flex items-center justify-between
          transition-all duration-500
          rounded-full

          ${
            scrolled
              ? "w-[90%] max-w-6xl px-8 py-4 bg-zinc-900 text-zinc-200 shadow-xl"
              : "w-[70%] max-w-4xl px-6 py-3 bg-zinc-800 text-zinc-200"
          }
        `}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/brand/palmar-logo.png"
            alt="Palmar"
            width={50}
            height={40}
            priority
          />
        </Link>

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/#home" className={linkStyle("home")}>
            Home
          </Link>
          <Link href="/#about" className={linkStyle("about")}>
            Sobre
          </Link>
          <Link href="/#services" className={linkStyle("services")}>
            Serviços
          </Link>
          <Link href="/imoveis" className={linkStyle("imoveis")}>
            Imóveis
          </Link>
          <Link href="/contato" className={linkStyle("contato")}>
            Contato
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 bg-zinc-700 hover:bg-zinc-800 rounded-lg transition"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute top-24 w-[90%] md:hidden">
          <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-6 flex flex-col gap-4">
            <Link href="/#home" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/#about" onClick={() => setMobileOpen(false)}>Sobre</Link>
            <Link href="/#services" onClick={() => setMobileOpen(false)}>Serviços</Link>
            <Link href="/imoveis" onClick={() => setMobileOpen(false)}>Imóveis</Link>
            <Link href="/contato" onClick={() => setMobileOpen(false)}>Contato</Link>
          </div>
        </div>
      )}
    </header>
  );
}