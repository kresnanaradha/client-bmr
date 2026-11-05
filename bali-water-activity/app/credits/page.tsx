import Image from "next/image";
import { PHOTO_CREDITS } from "@/lib/photoCredits";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Photo Credits",
  description: "Credits and licences for the photographs used on the Bali Water Activity website.",
  path: "/credits",
});

export default function CreditsPage() {
  return (
    <section className="gutter pb-24 pt-36 md:pb-28 md:pt-44">
      <p className="eyebrow mb-4 text-muted">Credits</p>
      <h1 className="t-page">
        Photo <em>credits</em>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        The watersport photos are our own. The destination and tour photos below are by the photographers listed, used
        under Creative Commons licences via Wikimedia Commons, and resized for this site.
      </p>

      <ul className="mt-16 grid border-t border-ink sm:grid-cols-2 sm:gap-x-10">
        {PHOTO_CREDITS.map((credit) => (
          <li key={credit.file} className="flex gap-5 border-b border-[var(--line)] py-5">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-sm">
              <Image src={credit.file} alt={credit.title} fill sizes="112px" className="object-cover" />
            </div>
            <div className="min-w-0 text-sm leading-relaxed">
              <a href={credit.source} target="_blank" rel="noopener noreferrer" className="link block truncate font-medium">
                {credit.title}
              </a>
              <p className="text-muted">by {credit.author}</p>
              <a href={credit.licenseUrl || credit.source} target="_blank" rel="noopener noreferrer" className="link text-muted">
                {credit.license}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
