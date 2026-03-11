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

    if (pathname === `/${item}`) {
      return true;
    }

    return false;
  };

  const linkStyle = (item: string) =>
    `px-4 py-2 text-sm rounded-full transition ${
      isActive(item) ? "bg-zinc-100 text-black" : "hover:bg-white/10"
    }`;

  return (
    <header className="fixed top-8 left-0 w-full z-50 flex justify-center">
      {/* CONTAINER */}
      <div
        className={`
        flex items-center justify-between
        transition-all duration-500
        rounded-full border

        ${
          scrolled
            ? "w-[90%] max-w-6xl px-8 py-4 bg-zinc-900 text-white border-zinc-900 shadow-xl"
            : "w-[70%] max-w-4xl px-6 py-3 bg-zinc-800 text-white "
        }
        `}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/brand/palmar-logo.png"
            alt="Palmar"
            width={scrolled ? 50 : 50}
            height={40}
            className="object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
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
          className="md:hidden p-2"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="absolute top-20 w-[90%] md:hidden">
          <div className="bg-zinc-900 text-white rounded-2xl border p-6 flex flex-col gap-4">
            <Link href="/#home" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link href="/#about" onClick={() => setMobileOpen(false)}>
              Sobre
            </Link>

            <Link href="/#services" onClick={() => setMobileOpen(false)}>
              Serviços
            </Link>

            <Link href="/imoveis" onClick={() => setMobileOpen(false)}>
              Imóveis
            </Link>

            <Link href="/contato" onClick={() => setMobileOpen(false)}>
              Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
