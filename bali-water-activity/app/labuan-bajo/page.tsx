import JsonLd, { breadcrumbSchema, offerSchema } from "@/components/JsonLd";
import { ClosingCta, PageHeader } from "@/components/sections/Sections";
import TourPackage, { TourGallery } from "@/components/tours/TourPackage";
import { labuanBajoPackages } from "@/lib/activities";
import { dummyImage } from "@/lib/dummyImage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Labuan Bajo and Komodo Tours",
  description:
    "Labuan Bajo trips from Bali: Komodo dragon trekking, the Padar Island viewpoint, Pink Beach and snorkeling. 2D1N island hopping or a 3D2N liveaboard, from Rp1,500K.",
  path: "/labuan-bajo",
  image: dummyImage("labuan-hero"),
  imageAlt: "Padar Island in Komodo National Park",
});

const ALT: Record<string, string> = {
  "labuan-bajo-2d1n": "A Komodo dragon on the beach",
  "labuan-bajo-3d2n": "A traditional phinisi boat at anchor near Labuan Bajo",
};

const GALLERY = [
  { src: dummyImage("labuan-1"), alt: "Boats pulled up on Pink Beach, Padar Island" },
  { src: dummyImage("labuan-2"), alt: "Close-up of a Komodo dragon" },
  { src: dummyImage("labuan-3"), alt: "A phinisi sailing between the islands" },
];

export default function LabuanBajoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Labuan Bajo", path: "/labuan-bajo" }]),
          ...labuanBajoPackages.map((pkg) =>
            offerSchema({ name: pkg.title, description: pkg.description, path: `/labuan-bajo#${pkg.slug}`, image: pkg.image, price: pkg.price }),
          ),
        ]}
      />
      <PageHeader
        tall
        image={dummyImage("labuan-hero")}
        imageAlt="Padar Island in Komodo National Park"
        eyebrow="Komodo National Park"
        title={
          <>
            Labuan <em>Bajo</em>
          </>
        }
        intro="Komodo dragons, pink sand and the view from Padar. A short trip from Bali, by boat or liveaboard."
      />

      <div className="gutter space-y-28 py-24 md:space-y-36 md:py-28">
        {labuanBajoPackages.map((pkg, index) => (
          <TourPackage
            key={pkg.slug}
            id={pkg.slug}
            kicker={pkg.duration}
            title={pkg.title}
            description={pkg.description}
            image={pkg.image}
            imageAlt={ALT[pkg.slug] ?? pkg.title}
            stopsLabel="Highlights"
            stops={pkg.highlights}
            includes={pkg.includes}
            excludes={pkg.excludes}
            price={pkg.price}
            badge={index === 1 ? "Best value" : undefined}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <TourGallery
        title={
          <>
            Komodo <em>in photos</em>
          </>
        }
        photos={GALLERY}
      />

      <ClosingCta
        image={dummyImage("labuan-bajo")}
        title={
          <>
            Two nights or three?
            <br />
            <em className="text-sun">Message us your dates.</em>
          </>
        }
        message="Hi Bali Water Activity! I'd like to book a Labuan Bajo trip."
      />
    </>
  );
}
