"use client";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I book an activity?",
    a: "Click 'Book Now' on any activity, fill in your name, date and number of guests, then send it to us on WhatsApp. Our team checks availability and replies to confirm your slot and the final price. We answer during opening hours, 09:00-16:00 WITA. No upfront payment.",
  },
  {
    q: "When do I pay?",
    a: "You pay on arrival at the activity location — cash only. There is no upfront payment or deposit required. This means zero financial risk for you.",
  },
  {
    q: "Are the activities safe for children?",
    a: "Yes! Most watersport activities are suitable for children aged 8 and above (Sea Walker from age 9). All children must be accompanied by a guardian and wear appropriate safety equipment provided by us.",
  },
  {
    q: "What should I wear/bring?",
    a: "Wear comfortable swimwear or quick-dry clothing. Bring sunscreen, a towel, and a change of clothes. Leave valuables in your hotel. Safety equipment (life jackets, helmets where applicable) is provided.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes. Since there's no upfront payment, cancellation is free. To reschedule, simply message us on WhatsApp at least 24 hours before your activity. We'll arrange a new time that suits you.",
  },
  {
    q: "Is insurance included?",
    a: "Yes! All participants are automatically covered by activity insurance for the duration of their session. This is included in the activity price at no extra cost.",
  },
  {
    q: "Do I need swimming skills for Sea Walker?",
    a: "No swimming or diving experience is required for Sea Walker. You simply walk on the ocean floor with a specially designed helmet that provides fresh air. Our guides will be with you every step of the way.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Safety is our priority. If weather conditions are unsafe, we'll reschedule your activity to another day at no extra charge. Our team monitors weather conditions daily.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-gap bg-linear-to-b from-[#0F1419] to-dark-navy text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full blur-3xl opacity-10 bg-[#0FA3B1] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before your Bali water adventure."
          light
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i ? "ring-2 ring-golden/30 shadow-xl" : ""
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-white/5 transition-colors duration-150"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white text-sm pr-4 group-hover:text-golden transition-colors">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-golden shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 border-t border-white/5 pt-4">
                  <p className="text-blue-100/80 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
