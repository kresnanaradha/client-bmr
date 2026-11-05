import Image from "next/image";
import Link from "next/link";
import { BUSINESS, waLink } from "@/lib/site";

const COLUMNS = [
  {
    title: "Watersports",
    links: [
      { label: "All activities", href: "/watersport" },
      { label: "Jet Ski", href: "/activity/jet-ski" },
      { label: "Parasailing", href: "/activity/parasailing" },
      { label: "Sea Walker", href: "/activity/sea-walker" },
    ],
  },
  {
    title: "Tours",
    links: [
      { label: "River rafting", href: "/rafting" },
      { label: "Nusa Penida", href: "/nusa-penida" },
      { label: "Labuan Bajo", href: "/labuan-bajo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Photo credits", href: "/credits" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="gutter bg-ink pb-24 pt-20 text-white md:pb-10">
      <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] md:gap-10">
        <div>
          <Image src="/logo-light.png" alt="Bali Water Activity" width={313} height={160} className="h-16 w-auto" />
          <p className="mt-5 max-w-xs text-mist">
            Watersports at Tanjung Benoa and tours across Bali and beyond, booked over WhatsApp.
          </p>
          <a href={waLink()} className="btn btn-sun mt-7">
            WhatsApp {BUSINESS.phoneDisplay}
          </a>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="eyebrow mb-4 text-mist">{column.title}</h2>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-sun">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-16 flex flex-col gap-2 border-t border-[var(--line-light)] pt-6 text-sm text-mist sm:flex-row sm:justify-between">
        <p>
          {BUSINESS.street}, {BUSINESS.locality}, {BUSINESS.region}
        </p>
        <p>© {new Date().getFullYear()} {BUSINESS.name}</p>
      </div>
    </footer>
  );
}
