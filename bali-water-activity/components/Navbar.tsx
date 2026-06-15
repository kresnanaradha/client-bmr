"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Waves, Ship, Mountain, MapPin, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Activities",
    href: "#",
    children: [
      { label: "Watersport", href: "/watersport", icon: Waves, desc: "Jet ski, parasailing & more" },
      { label: "Rafting", href: "/rafting", icon: Ship, desc: "Ayung & Telaga river rapids" },
      { label: "Nusa Penida Tour", href: "/nusa-penida", icon: MapPin, desc: "Kelingking & island hopping" },
      { label: "Labuan Bajo Tour", href: "/labuan-bajo", icon: Mountain, desc: "Komodo & Pink Beach" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/75 backdrop-blur-md border-gray-200/40 shadow-lg shadow-blue-900/5 py-3"
          : "bg-transparent border-white/10 py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Bali Water Activity"
              width={256}
              height={256}
              className="h-16 w-auto"
              placeholder="empty"
              unoptimized
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex items-center gap-2">
              <h1 className={`font-bold text-base leading-tight ${scrolled ? "text-[#0F1419]" : "text-white"}`}>
                Bali Water Activity
              </h1>
            </div>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-7 font-semibold ${scrolled ? "text-[#0F1419]" : "text-white"}`}>
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 cursor-pointer transition-colors ${scrolled ? "hover:text-primary-blue!" : "hover:text-[#D4AF37]!"}`}
                >
                  {link.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                  />
                </button>
                {/* Invisible bridge + dropdown — pt-3 keeps hover continuous (no dead zone) */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 transition-all duration-200 ${
                    activeDropdown === link.label
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-blue-900/10 border border-white/30 p-2 overflow-hidden">
                    {link.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/40 transition-colors duration-150 cursor-pointer"
                      >
                        <span className="w-9 h-9 rounded-lg gradient-card flex items-center justify-center shrink-0">
                          <child.icon size={16} className="text-white" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-[#0F1419] group-hover/item:text-primary-blue transition-colors">
                            {child.label}
                          </span>
                          <span className="block text-[11px] text-[#64748B] truncate">{child.desc}</span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-[#64748B] group-hover/item:text-primary-blue opacity-0 group-hover/item:opacity-100 transition-all shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${scrolled ? "text-[#0F1419] hover:text-primary-blue!" : "text-white hover:text-[#D4AF37]!"}`}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://wa.me/628XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20an%20activity"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>📱</span> Book Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden cursor-pointer p-1.5 rounded-xl transition-all ${
            scrolled ? "text-[#0F1419] hover:bg-gray-100" : "text-white hover:bg-white/10"
          }`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            setActiveDropdown(null);
          }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 px-4 py-4 flex flex-col gap-1 shadow-xl"
        >
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p className="text-[10px] uppercase tracking-widest text-orange font-bold mt-3 mb-1 px-1">
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMenuOpen(false)}
                    className="block pl-3 py-2.5 text-[#0F1419] text-sm font-medium hover:text-primary-blue hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-1 text-[#0F1419] font-medium text-sm hover:text-primary-blue cursor-pointer"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://wa.me/628XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20book%20an%20activity"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-sunset text-white text-center py-3.5 rounded-2xl font-semibold mt-3 cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Book Now via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
