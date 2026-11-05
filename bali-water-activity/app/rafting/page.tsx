import JsonLd, { breadcrumbSchema, offerSchema } from "@/components/JsonLd";
import { ClosingCta, PageHeader } from "@/components/sections/Sections";
import TourPackage from "@/components/tours/TourPackage";
import { raftingPackages } from "@/lib/activities";
import { dummyImage } from "@/lib/dummyImage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Bali River Rafting: Ayung and Telaga Waja",
  description:
    "White water rafting in Bali: the Ayung River near Ubud for first-timers, or Telaga Waja's grade III to IV rapids in East Bali. Lunch, guide and insurance included, from Rp300K.",
  path: "/rafting",
  image: dummyImage("rafting-hero"),
  imageAlt: "Rafting through the Ayung River valley",
});

const ALT: Record<string, string> = {
  "ayung-river-rafting": "Rafters paddling through the Ayung River gorge",
  "telaga-waja-rafting": "Green jungle walls along a Bali river valley",
};

export default function RaftingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Rafting", path: "/rafting" }]),
          ...raftingPackages.map((pkg) =>
            offerSchema({ name: pkg.title, description: pkg.description, path: `/rafting#${pkg.slug}`, image: pkg.image, price: pkg.netPrice }),
          ),
        ]}
      />
      <PageHeader
        image={dummyImage("rafting-hero")}
        imageAlt="Rafting through the Ayung River valley"
        eyebrow="Ubud · East Bali"
        title={
          <>
            River rafting <em>in Bali</em>
          </>
        }
        intro="Two rivers, two moods. The Ayung is calm enough for first-timers; Telaga Waja is for people who want white water."
      />

      <div className="gutter space-y-28 py-24 md:space-y-36 md:py-28">
        {raftingPackages.map((pkg, index) => (
          <TourPackage
            key={pkg.slug}
            id={pkg.slug}
            kicker={`${pkg.duration} · ${pkg.distance} · ${pkg.level}`}
            title={pkg.title}
            description={pkg.description}
            image={pkg.image}
            imageAlt={ALT[pkg.slug] ?? pkg.title}
            itinerary={pkg.itinerary}
            includes={pkg.includes}
            excludes={pkg.excludes}
            price={pkg.netPrice}
            wasPrice={pkg.publishPrice}
            badge={index === 1 ? "For thrill seekers" : undefined}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <section className="gutter pb-24 md:pb-28">
        <div className="rule grid gap-6 pt-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2 className="eyebrow text-muted">Safety</h2>
          <p className="max-w-2xl text-lg">
            Every group gets a full safety briefing before getting on the water. Helmets, life jackets and certified guides
            are always provided.
          </p>
        </div>
      </section>

      <ClosingCta
        image={null}
        title={
          <>
            Pick a river.
            <br />
            <em className="text-sun">We&apos;ll sort out the rest.</em>
          </>
        }
        message="Hi Bali Water Activity! I'd like to book river rafting."
      />
    </>
  );
}
