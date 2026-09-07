import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { dummyImage } from "@/lib/dummyImage";
import { Target, Eye, MessageCircle, Users, Shield, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Bali Water Activity",
  description:
    "Learn about Bali Water Activity — your trusted booking platform for water activities, rafting, and island tours in Bali and beyond.",
};

const WA_NUMBER = "628XXXXXXXXXX";
const WA_MSG = "Hi! I'd like to learn more about Bali Water Activity and book an activity.";

const steps = [
  {
    step: "1",
    title: "Browse Activities",
    desc: "Explore our website to find the perfect activity — watersport, rafting, or island tour.",
    icon: MessageCircle,
  },
  {
    step: "2",
    title: "Contact via WhatsApp",
    desc: "Click 'Book Now' to open WhatsApp. Tell us your preferred activity, date, and group size.",
    icon: MessageCircle,
  },
  {
    step: "3",
    title: "Get Instant Confirmation",
    desc: "Our team responds within minutes to confirm availability and provide all details.",
    icon: Shield,
  },
  {
    step: "4",
    title: "Show Up & Pay",
    desc: "Arrive at the activity location, pay cash on arrival, and enjoy your adventure!",
    icon: Award,
  },
];

const figures = [
  { icon: Users, num: "3,500+", label: "Happy Customers" },
  { icon: Shield, num: "100%", label: "Insured Activities" },
  { icon: Award, num: "4.9/5", label: "Average Rating" },
  { icon: MessageCircle, num: "< 5 min", label: "Response Time" },
];

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To provide every traveler in Bali with safe, accessible, and unforgettable water activity experiences — backed by professional service, transparent pricing, and a genuine passion for adventure.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To become the most trusted and recognized water activity booking platform in Bali — known for excellence in safety, customer service, and delivering experiences that travelers remember for a lifetime.",
  },
];

export default function AboutPage() {
  return (
    <div className="ocean-page">
      {/* Hero */}
      <section className="aq-page-hero h-[52vh] min-h-[360px]">
        <img
          src={dummyImage("about-hero", 1920, 1080)}
          alt="About Bali Water Activity"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <span className="aq-eyebrow mb-4">Our Story</span>
          <h1 className="aq-display text-display-lg text-white">About Bali Water Activity</h1>
        </div>
      </section>

      {/* Company overview */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="aq-eyebrow mb-5">Who We Are</span>
              <h2 className="aq-display mb-7 text-display-md text-[#EAF4F8]">
                Your Trusted Bali Activity Partner
              </h2>
              <div className="space-y-5 text-[15px] leading-[1.85] text-[#8FB0C2]">
                <p>
                  Bali Water Activity is a centralized booking platform dedicated to connecting travelers with the best water adventures in Bali and beyond. We are not just a booking site — we are your personal concierge for unforgettable experiences.
                </p>
                <p>
                  We work with a trusted network of certified, experienced activity operators across Bali. While our partners handle the on-ground operations, we manage all customer interactions, bookings, and quality assurance — ensuring a seamless, premium experience under the Bali Water Activity brand.
                </p>
                <p>
                  Whether you&apos;re an adventure seeker, a family on vacation, or a couple looking for a romantic sunset parasailing experience — we have something for everyone. Our mission is simple: make your Bali adventure safe, easy, and absolutely unforgettable.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {figures.map((s) => (
                <div key={s.label} className="aq-panel aq-panel-hover p-7 text-center">
                  <s.icon size={22} strokeWidth={1.6} className="mx-auto mb-4 text-[#3ED6E0]" />
                  <p className="aq-accent-text font-display text-[28px] font-semibold leading-none">{s.num}</p>
                  <p className="mt-2.5 text-[12px] text-[#6E90A4]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pillars.map((c) => (
              <div key={c.title} className="aq-panel aq-panel-hover p-9">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
                  <c.icon size={21} strokeWidth={1.6} />
                </div>
                <h3 className="mb-3.5 text-[20px] font-semibold text-[#EAF4F8]">{c.title}</h3>
                <p className="text-[14px] leading-[1.85] text-[#8FB0C2]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking process */}
      <section className="section-gap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Booking in 4 Simple Steps"
            subtitle="No complicated forms, no upfront payment. Just a quick WhatsApp message and you're booked!"
            light
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-[62px] z-0 hidden h-px bg-gradient-to-r from-white/18 to-transparent lg:block"
                    style={{ width: "calc(100% - 4rem)", left: "calc(50% + 2.5rem)" }}
                  />
                )}
                <div className="aq-panel aq-panel-hover relative z-10 h-full p-7 text-center">
                  <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#F9913E]/35 bg-[#F9913E]/12 font-display text-[17px] font-semibold text-[#FFC48A]">
                    {s.step}
                  </div>
                  <h3 className="mb-2.5 text-[16px] font-semibold text-[#EAF4F8]">{s.title}</h3>
                  <p className="text-[13px] leading-[1.75] text-[#8FB0C2]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="aq-btn"
            >
              Start Booking Now
            </a>
          </div>
        </div>
      </section>

      {/* Partner model */}
      <section className="section-gap">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="aq-panel relative overflow-hidden p-10 text-center md:p-14">
            <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[280px] w-[560px] max-w-[130%] -translate-x-1/2 rounded-full bg-[#3ED6E0]/12 blur-[90px]" />
            <div className="relative z-10">
              <h3 className="aq-display mb-5 text-[26px] text-[#EAF4F8]">Our Partner Network</h3>
              <p className="text-[14px] leading-[1.9] text-[#8FB0C2]">
                We work exclusively with certified, licensed operators who meet our strict safety and quality standards. Our partners cover watersport activities at Tanjung Benoa, rafting on Ayung and Telaga Waja rivers, Nusa Penida day tours, and Labuan Bajo expeditions. While partners handle the operations, <strong className="font-semibold text-[#FFC48A]">all bookings and customer service remain under the Bali Water Activity brand</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
