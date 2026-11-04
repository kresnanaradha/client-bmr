import type { Metadata } from "next";
import Image from "next/image";
import { PHOTO_CREDITS } from "@/lib/photoCredits";

export const metadata: Metadata = {
  title: "Photo Credits – Bali Water Activity",
  description: "Credits for the photographs used on this website.",
};

export default function CreditsPage() {
  return (
    <div className="ocean-page min-h-screen px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-3 text-3xl font-light text-[var(--aq-text)] md:text-4xl">Photo Credits</h1>
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-[var(--aq-muted)]">
          Watersport photos are our own. The destination and tour photos below are by the
          photographers listed, used under Creative Commons licences via Wikimedia Commons, and
          resized for this site.
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {PHOTO_CREDITS.map((credit) => (
            <li
              key={credit.file}
              className="flex gap-4 rounded-2xl border border-[var(--aq-line)] bg-[var(--aq-glass)] p-3"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                <Image src={credit.file} alt={credit.title} fill sizes="112px" className="object-cover" />
              </div>
              <div className="min-w-0 text-xs leading-relaxed">
                <a
                  href={credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate font-semibold text-[var(--aq-text)] hover:text-[var(--aq-sand)]"
                >
                  {credit.title}
                </a>
                <p className="text-[var(--aq-muted)]">by {credit.author}</p>
                <a
                  href={credit.licenseUrl || credit.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--aq-aqua)] hover:underline"
                >
                  {credit.license}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
