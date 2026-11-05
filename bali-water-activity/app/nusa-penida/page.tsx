import JsonLd, { breadcrumbSchema, offerSchema } from "@/components/JsonLd";
import { ClosingCta, PageHeader } from "@/components/sections/Sections";
import TourPackage, { TourGallery } from "@/components/tours/TourPackage";
import { nusaPenidaPackages } from "@/lib/activities";
import { dummyImage } from "@/lib/dummyImage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Nusa Penida Day Tours from Bali",
  description:
    "Full-day Nusa Penida tours from Bali by fast boat: Kelingking Beach and Angel's Billabong, Atuh and Diamond Beach, or snorkeling with manta rays. Lunch included, from Rp450K.",
  path: "/nusa-penida",
  image: dummyImage("penida-hero"),
  imageAlt: "Kelingking Beach on Nusa Penida",
});

const ALT: Record<string, string> = {
  "nusa-penida-west-tour": "Kelingking Beach seen from the cliff path",
  "nusa-penida-east-tour": "Atuh Beach on the east coast of Nusa Penida",
  "nusa-penida-snorkeling": "A manta ray gliding over the reef near Nusa Penida",
};

const GALLERY = [
  { src: dummyImage("penida-1"), alt: "Angel's Billabong tide pool" },
  { src: dummyImage("penida-2"), alt: "The rock arch at Broken Beach" },
  { src: dummyImage("penida-3"), alt: "Diamond Beach from the staircase" },
  { src: dummyImage("penida-4"), alt: "Boats moored at Crystal Bay" },
];

export default function NusaPenidaPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Nusa Penida", path: "/nusa-penida" }]),
          ...nusaPenidaPackages.map((pkg) =>
            offerSchema({ name: pkg.title, description: pkg.description, path: `/nusa-penida#${pkg.slug}`, image: pkg.image, price: pkg.price }),
          ),
        ]}
      />
      <PageHeader
        tall
        image={dummyImage("penida-hero")}
        imageAlt="Kelingking Beach on Nusa Penida"
        eyebrow="A fast boat from Bali"
        title={
          <>
            Nusa <em>Penida</em>
          </>
        }
        intro="Bali's dramatic island: the Kelingking cliffs, turquoise coves and manta rays. Three full-day tours, all with lunch included."
      />

      <div className="gutter space-y-28 py-24 md:space-y-36 md:py-28">
        {nusaPenidaPackages.map((pkg, index) => (
          <TourPackage
            key={pkg.slug}
            id={pkg.slug}
            kicker={pkg.duration}
            title={pkg.title}
            description={pkg.description}
            image={pkg.image}
            imageAlt={ALT[pkg.slug] ?? pkg.title}
            stopsLabel="Stops"
            stops={pkg.destinations}
            includes={pkg.includes}
            excludes={pkg.excludes}
            price={pkg.price}
            badge={index === 0 ? "Most popular" : undefined}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <TourGallery
        title={
          <>
            The island <em>in photos</em>
          </>
        }
        photos={GALLERY}
      />

      <ClosingCta
        image={dummyImage("nusa-penida")}
        title={
          <>
            West, east or underwater?
            <br />
            <em className="text-sun">Tell us, we&apos;ll book the boat.</em>
          </>
        }
        message="Hi Bali Water Activity! I'd like to book a Nusa Penida tour."
      />
    </>
  );
}
