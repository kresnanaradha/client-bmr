import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, MapPin, Shield, TrendingUp, X } from "lucide-react";
import { getRelatedTours, getTourBySlug, tourPackages } from "@/lib/tours";
import BookNowButton from "@/components/BookNowButton";
import ViewItemTracker from "@/components/ViewItemTracker";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tourPackages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getTourBySlug(slug);
  if (!pkg) return {};

  return {
    title: `${pkg.title} – Book via WhatsApp`,
    description: `${pkg.description} Duration: ${pkg.duration}. From ${pkg.price} per person.`,
    openGraph: {
      title: `${pkg.title} | Bali Water Activity`,
      description: pkg.description,
      images: [{ url: pkg.image }],
    },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getTourBySlug(slug);
  if (!pkg) notFound();

  const bookingActivity = {
    slug: pkg.slug,
    title: pkg.title,
    price: pkg.price,
    category: pkg.category,
  };
  const related = getRelatedTours(pkg);

  return (
    <>
      <ViewItemTracker activity={bookingActivity} />

      <section className="relative flex h-72 items-end overflow-hidden md:h-96">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B5E]/85 to-[#2196C4]/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link
            href={pkg.categoryPath}
            className="mb-3 inline-flex cursor-pointer items-center gap-1 text-sm text-blue-200 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to {pkg.categoryLabel}
          </Link>
          <h1 className="text-3xl font-bold text-white md:text-4xl">{pkg.title}</h1>
          <p className="mt-1 text-blue-200">{pkg.categoryLabel} · Bali</p>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-5 text-sm text-[#475569]">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#1A2FB0]" /> {pkg.duration}
            </span>
            {pkg.level && (
              <span className="flex items-center gap-1.5">
                <TrendingUp size={14} className="text-[#1A2FB0]" /> {pkg.level}
              </span>
            )}
            {pkg.distance && (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#1A2FB0]" /> {pkg.distance}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-[#1A2FB0]" /> Insured
            </span>
            <span className="font-bold text-[#1A2FB0]">{pkg.price}</span>
          </div>
          <BookNowButton
            activity={bookingActivity}
            label="Book via WhatsApp"
            iconSize={14}
            className="flex cursor-pointer items-center gap-2 gradient-sunset rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-bold text-[#0C1A4A]">Overview</h2>
              <p className="leading-relaxed text-[#475569]">{pkg.description}</p>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-[#0C1A4A]">{pkg.detailListTitle}</h2>
              <ol className="space-y-3">
                {pkg.detailList.map((item, i) => (
                  <li key={item} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A2FB0]/10 text-xs font-bold text-[#1A2FB0]">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-[#475569]">{item}</span>
                  </li>
                ))}
              </ol>
            </section>

            <div className="grid gap-5 sm:grid-cols-2">
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#0C1A4A]">
                  Included
                </h2>
                <ul className="space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#475569]">
                      <CheckCircle size={13} className="mt-0.5 shrink-0 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#0C1A4A]">
                  Not included
                </h2>
                <ul className="space-y-2">
                  {pkg.excludes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#475569]">
                      <X size={13} className="mt-0.5 shrink-0 text-red-400" /> {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="space-y-5">
            <div className="sticky top-32 rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
              <p className="mb-1 text-xs uppercase tracking-widest text-[#475569]">Starting from</p>
              <p className="mb-4 text-3xl font-bold text-[#1A2FB0]">{pkg.price}</p>
              <p className="mb-5 text-sm text-[#475569]">per person · pay on arrival</p>

              <BookNowButton
                activity={bookingActivity}
                label="Book via WhatsApp"
                className="mb-3 flex w-full cursor-pointer items-center justify-center gap-2 gradient-sunset rounded-full py-3.5 text-center font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
              />
              <p className="text-center text-xs text-[#475569]">
                No upfront payment · we confirm on WhatsApp
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-5 text-lg font-bold text-[#0C1A4A]">Other trips you might like</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/tour/${other.slug}`}
                  className="card-hover w-52 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="208px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-[#0C1A4A]">{other.title}</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1A2FB0]">{other.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
