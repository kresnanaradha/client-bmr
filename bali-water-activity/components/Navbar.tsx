"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { waLink } from "@/lib/site";

const LINKS = [
  { label: "Watersports", href: "/watersport" },
  { label: "Rafting", href: "/rafting" },
  { label: "Nusa Penida", href: "/nusa-penida" },
  { label: "Labuan Bajo", href: "/labuan-bajo" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Pages that open on a dark full-width photo; every other page starts on paper,
// so the bar is solid there from the top.
const DARK_HERO_PAGES = ["/", "/watersport", "/rafting", "/nusa-penida", "/labuan-bajo", "/about"];
const hasDarkHero = (pathname: string) =>
  DARK_HERO_PAGES.includes(pathname) || pathname.startsWith("/activity/");

export default function Navbar() {
  const pathname = usePathname();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // The home hero is two screens tall while its video expands.
      const threshold = pathname === "/" ? window.innerHeight * 2 - 80 : 40;
      setScrolledPastHero(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolledPastHero || !hasDarkHero(pathname);
  const isActive = (href: string) => pathname === href || (href === "/watersport" && pathname.startsWith("/activity/"));

  return (
    <>
      <header
        className={`gutter fixed inset-x-0 top-0 z-50 flex items-center justify-between transition-[background-color,box-shadow,padding] duration-300 ${
          solid ? "bg-paper/95 py-2.5 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur" : "py-5 text-white"
        }`}
      >
        <Link href="/" aria-label="Bali Water Activity, home" onClick={() => setMenuOpen(false)}>
          <Image
            src={solid ? "/logo.png" : "/logo-light.png"}
            alt="Bali Water Activity"
            width={313}
            height={160}
            priority
            className={`w-auto transition-[height] duration-300 ${solid ? "h-12" : "h-14"}`}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-[15px] font-medium underline-offset-[6px] hover:underline ${
                isActive(link.href) ? "underline decoration-1" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href={waLink("Hi Bali Water Activity! I'd like to book an activity.")} className={`btn ${solid ? "btn-ink" : "btn-light"}`}>
            Book on WhatsApp
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <Menu size={26} strokeWidth={1.6} />
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-paper text-ink lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="gutter flex items-center justify-between py-2.5 shadow-[0_1px_0_var(--line)]">
            <Link href="/" aria-label="Bali Water Activity, home" onClick={() => setMenuOpen(false)}>
              <Image src="/logo.png" alt="Bali Water Activity" width={313} height={160} className="h-12 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center"
            >
              <X size={26} strokeWidth={1.6} />
            </button>
          </div>
          <nav aria-label="Main" className="gutter flex flex-1 flex-col overflow-y-auto pb-8 pt-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="font-serif border-b border-[var(--line)] py-4 text-[34px] leading-none"
              >
                {link.label}
              </Link>
            ))}
            <a href={waLink("Hi Bali Water Activity! I'd like to book an activity.")} className="btn btn-ink mt-8 w-full">
              Book on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
