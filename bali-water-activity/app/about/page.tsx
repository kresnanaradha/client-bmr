import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=85"
          alt="About Bali Water Activity"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <span className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest">Our Story</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">About Bali Water Activity</h1>
        </div>
      </section>

      {/* Company overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest">Who We Are</span>
              <h2 className="text-3xl font-bold text-[#0C1A4A] mt-2 mb-4">Your Trusted Bali Activity Partner</h2>
              <p className="text-[#475569] text-base leading-relaxed mb-4">
                Bali Water Activity is a centralized booking platform dedicated to connecting travelers with the best water adventures in Bali and beyond. We are not just a booking site — we are your personal concierge for unforgettable experiences.
              </p>
              <p className="text-[#475569] text-base leading-relaxed mb-4">
                We work with a trusted network of certified, experienced activity operators across Bali. While our partners handle the on-ground operations, we manage all customer interactions, bookings, and quality assurance — ensuring a seamless, premium experience under the Bali Water Activity brand.
              </p>
              <p className="text-[#475569] text-base leading-relaxed">
                Whether you&apos;re an adventure seeker, a family on vacation, or a couple looking for a romantic sunset parasailing experience — we have something for everyone. Our mission is simple: make your Bali adventure safe, easy, and absolutely unforgettable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, num: "3,500+", label: "Happy Customers" },
                { icon: Shield, num: "100%", label: "Insured Activities" },
                { icon: Award, num: "4.9/5", label: "Average Rating" },
                { icon: MessageCircle, num: "< 5 min", label: "Response Time" },
              ].map((s) => (
                <div key={s.label} className="bg-[#F0F9FF] rounded-2xl p-5 text-center">
                  <s.icon size={24} className="text-[#1A2FB0] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#0C1A4A]">{s.num}</p>
                  <p className="text-xs text-[#475569]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#F0F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center mb-4">
                <Target size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-xl text-[#0C1A4A] mb-3">Our Mission</h3>
              <p className="text-[#475569] leading-relaxed">
                To provide every traveler in Bali with safe, accessible, and unforgettable water activity experiences — backed by professional service, transparent pricing, and a genuine passion for adventure.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center mb-4">
                <Eye size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-xl text-[#0C1A4A] mb-3">Our Vision</h3>
              <p className="text-[#475569] leading-relaxed">
                To become the most trusted and recognized water activity booking platform in Bali — known for excellence in safety, customer service, and delivering experiences that travelers remember for a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="Booking in 4 Simple Steps"
            subtitle="No complicated forms, no upfront payment. Just a quick WhatsApp message and you're booked!"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 z-0" style={{ width: "calc(100% - 3rem)", left: "calc(50% + 1.5rem)" }} />
                )}
                <div className="bg-[#F0F9FF] rounded-2xl p-6 text-center relative z-10">
                  <div className="w-12 h-12 gradient-card rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">{s.step}</span>
                  </div>
                  <h3 className="font-bold text-[#0C1A4A] mb-2">{s.title}</h3>
                  <p className="text-[#475569] text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-sunset text-white font-semibold px-8 py-4 rounded-full inline-flex items-center gap-2 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Start Booking Now
            </a>
          </div>
        </div>
      </section>

      {/* Partner model */}
      <section className="py-12 bg-[#F0F9FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-card rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Our Partner Network</h3>
            <p className="text-blue-200 leading-relaxed">
              We work exclusively with certified, licensed operators who meet our strict safety and quality standards. Our partners cover watersport activities at Tanjung Benoa, rafting on Ayung and Telaga Waja rivers, Nusa Penida day tours, and Labuan Bajo expeditions. While partners handle the operations, <strong className="text-white">all bookings and customer service remain under the Bali Water Activity brand</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
