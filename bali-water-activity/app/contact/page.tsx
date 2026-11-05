import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { BUSINESS, waLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import ContactForm from "./ContactClient";

export const metadata = pageMeta({
  title: "Contact Us",
  description:
    "Message Bali Water Activity on WhatsApp at +62 812-4600-378, email us, or send the form. Watersports at Tanjung Benoa and tours across Bali.",
  path: "/contact",
});

const DETAILS = [
  { label: "WhatsApp", value: BUSINESS.phoneDisplay, note: "Online daily, 08:00 to 20:00 WITA", href: waLink("Hi Bali Water Activity! I have a question.") },
  { label: "Email", value: BUSINESS.email, note: "Replies within 24 hours", href: `mailto:${BUSINESS.email}` },
  { label: "Office", value: `${BUSINESS.street}, ${BUSINESS.locality}`, note: `${BUSINESS.region}, Indonesia ${BUSINESS.postalCode}` },
  { label: "Activities", value: BUSINESS.activityArea, note: "Daily, 09:00 to 17:00 WITA" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <section className="gutter pb-24 pt-36 md:pb-28 md:pt-44">
        <p className="eyebrow mb-4 text-muted">Contact</p>
        <h1 className="t-page max-w-4xl">
          Ask us <em>anything</em>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          WhatsApp is the fastest way to reach us. The form below opens WhatsApp with your message already written.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <dl className="border-t border-ink">
            {DETAILS.map((item) => (
              <div key={item.label} className="border-b border-[var(--line)] py-6">
                <dt className="eyebrow mb-2 text-muted">{item.label}</dt>
                <dd>
                  {item.href ? (
                    <a href={item.href} className="link font-serif text-[28px] leading-tight">
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-serif text-[28px] leading-tight">{item.value}</span>
                  )}
                  <span className="mt-1 block text-muted">{item.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <ContactForm />
        </div>
      </section>

      <section aria-label="Map" className="h-[420px] border-t border-[var(--line)]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.0898!2d115.2283!3d-8.7562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDUnMjIuMyJTIDExNcKwMTMnNDIuMSJF!5e0!3m2!1sen!2sid!4v1234567890"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of Tanjung Benoa, where the watersports take place"
        />
      </section>
    </>
  );
}
