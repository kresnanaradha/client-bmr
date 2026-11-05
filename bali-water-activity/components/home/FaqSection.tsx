import { Plus } from "lucide-react";
import JsonLd, { faqSchema } from "@/components/JsonLd";
import { SectionHead } from "@/components/sections/Sections";

export const FAQS = [
  {
    q: "How do I book an activity?",
    a: "Tap Book on WhatsApp on any activity page and tell us the date and how many people are coming. Our team confirms the booking on WhatsApp. There are no forms and no upfront payment.",
  },
  {
    q: "When do I pay?",
    a: "You pay on arrival at the activity location, in cash. No deposit is needed.",
  },
  {
    q: "Are the activities safe for children?",
    a: "Most watersports are open from age 8, and Sea Walker from age 9. Children must be with a guardian and wear the safety equipment we provide.",
  },
  {
    q: "What should I wear or bring?",
    a: "Swimwear or quick-dry clothes, sunscreen, a towel and a change of clothes. Leave valuables at your hotel. Life jackets, and helmets where needed, are provided.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "Yes. As nothing is paid upfront, cancelling costs nothing. To reschedule, message us on WhatsApp at least 24 hours before your activity.",
  },
  {
    q: "Is insurance included?",
    a: "Yes. Every participant is covered by activity insurance for the length of their session, at no extra cost.",
  },
  {
    q: "Do I need to swim for Sea Walker?",
    a: "No. You walk on the seabed wearing a helmet that supplies fresh air, with a guide beside you the whole time.",
  },
  {
    q: "What happens if the weather is bad?",
    a: "If conditions are unsafe, we move your activity to another day at no extra charge.",
  },
];

export default function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="gutter py-24 md:py-28">
      <JsonLd data={faqSchema(FAQS)} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="faq-title"
            eyebrow="Questions"
            title={
              <>
                Asked <em>often</em>
              </>
            }
          />
        </div>
        <div className="border-t border-ink">
          {FAQS.map((item) => (
            <details key={item.q} className="group border-b border-[var(--line)]">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-lg font-medium">
                {item.q}
                <Plus size={20} strokeWidth={1.6} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-6 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
