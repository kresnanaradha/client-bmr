"use client";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I book an activity?",
    a: "Simply click the 'Book Now' or 'Book via WhatsApp' button on any activity page. You'll be redirected to WhatsApp where our team will confirm your booking within minutes. No complicated forms, no upfront payment.",
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
    <section className="section-gap relative">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before your Bali water adventure."
          light
        />

        <div className="aq-panel divide-y divide-white/10 overflow-hidden !rounded-[28px] p-0">
          {faqs.map((faq, i) => (
            <div key={i} className={open === i ? "bg-white/[0.035]" : ""}>
              <button
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-7 py-6 text-left transition-colors duration-200 hover:bg-white/[0.03]"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className={`text-[15px] font-medium transition-colors ${open === i ? "text-[#FFC48A]" : "text-[#EAF4F8]"}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.8}
                  className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-[#FFC48A]" : "text-[#6E90A4]"}`}
                />
              </button>
              {open === i && (
                <div className="px-7 pb-7">
                  <p className="max-w-2xl text-[14px] leading-[1.8] text-[#8FB0C2]">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
