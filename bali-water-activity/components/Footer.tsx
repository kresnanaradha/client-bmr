"use client";
import { WA_NUMBER } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Waves } from "lucide-react";
import { useState } from "react";

const socials = [
  { label: "Instagram", svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { label: "Facebook", svg: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "YouTube", svg: "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
];

function FooterLogo() {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
          <Waves size={20} className="text-[#FFC48A]" />
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">Bali Water</p>
          <p className="text-[#FFC48A] font-bold text-base leading-tight">Activity</p>
        </div>
      </div>
    );
  }
  return (
    <Image
      src="/logo.png"
      alt="Bali Water Activity"
      width={180}
      height={64}
      className="h-16 w-auto mb-4 brightness-0 invert"
      onError={() => setErr(true)}
    />
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-linear-to-b from-[#04131F] to-[#072334] pt-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="text-[#8FB0C2] text-sm leading-relaxed mb-5">
              Your trusted partner for premium water activities in Bali. Safe, fun, and unforgettable experiences for every traveler.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 glass hover:bg-[#FFC48A] hover:text-[#1B0E02] border-white/10 hover:border-[#FFC48A] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 hover:shadow-lg hover:shadow-[#F9913E]/25"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d={s.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#FFC48A] mb-4">Activities</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Watersport Bali", href: "/watersport" },
                { label: "Rafting Adventure", href: "/rafting" },
                { label: "Nusa Penida Tour", href: "/nusa-penida" },
                { label: "Labuan Bajo Tour", href: "/labuan-bajo" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#8FB0C2] hover:text-[#FFC48A] transition-colors duration-150 cursor-pointer flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC48A]/50 group-hover:bg-[#FFC48A] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#FFC48A] mb-4">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#8FB0C2] hover:text-[#FFC48A] transition-colors duration-150 cursor-pointer flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC48A]/50 group-hover:bg-[#FFC48A] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-[#FFC48A] mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                  <MapPin size={13} className="text-[#FFC48A]" />
                </div>
                <span className="text-sm leading-snug">Tanjung Benoa, Nusa Dua, Bali, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                  <Phone size={13} className="text-[#FFC48A]" />
                </div>
                <a href={`https://wa.me/${WA_NUMBER}`} className="text-sm text-[#8FB0C2] hover:text-white cursor-pointer transition-colors">
                  +62 8XX-XXXX-XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                  <Mail size={13} className="text-[#FFC48A]" />
                </div>
                <a href="mailto:hello@baliwateractivity.com" className="text-sm text-[#8FB0C2] hover:text-white cursor-pointer transition-colors">
                  hello@baliwateractivity.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#6E90A4]">
            © {new Date().getFullYear()} Bali Water Activity. All rights reserved.
          </p>
          <Link href="/credits" className="text-xs text-[#6E90A4] hover:text-[#FFC48A] transition-colors">
            Photo credits
          </Link>
        </div>
      </div>
    </footer>
  );
}


