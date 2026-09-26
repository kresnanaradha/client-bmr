"use client";
import { WA_NUMBER } from "@/lib/site";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";


const channels = [
  { icon: Phone, label: "WhatsApp", value: "+62 8XX-XXXX-XXXX", sub: "Online daily 8:00–20:00 WITA", href: `https://wa.me/${WA_NUMBER}` },
  { icon: Mail, label: "Email", value: "hello@baliwateractivity.com", sub: "Response within 24 hours", href: "mailto:hello@baliwateractivity.com" },
  { icon: MapPin, label: "Location", value: "Tanjung Benoa, Nusa Dua", sub: "Bali, Indonesia 80363", href: "#" },
  { icon: Clock, label: "Operating Hours", value: "Daily 08:00 – 17:00 WITA", sub: "Open 7 days a week", href: "#" },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name} (${form.email}).\n\nSubject: ${form.subject}\n\nMessage: ${form.message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div className="ocean-page">
      {/* Hero */}
      <section className="relative pb-20 pt-40 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(62,214,224,0.14),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="aq-eyebrow mb-6">Get In Touch</span>
          <h1 className="aq-display mb-5 text-display-lg text-[#EAF4F8]">Contact Us</h1>
          <p className="mx-auto max-w-lg text-[15px] leading-[1.8] text-[#8FB0C2]">
            Have a question or ready to book? Reach out via WhatsApp, email, or the form below — we respond fast!
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="aq-panel aq-panel-hover flex items-start gap-4 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3ED6E0]/25 bg-[#3ED6E0]/10 text-[#3ED6E0]">
                    <c.icon size={17} strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#6E90A4]">{c.label}</p>
                    <p className="mt-1 text-[14px] font-semibold text-[#EAF4F8]">{c.value}</p>
                    <p className="mt-0.5 text-[12px] text-[#6E90A4]">{c.sub}</p>
                  </div>
                </a>
              ))}

              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hi%20Bali%20Water%20Activity!%20I%20have%20a%20question.`}
                target="_blank"
                rel="noopener noreferrer"
                className="aq-btn !w-full"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                Message Us on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="aq-panel p-8 md:p-10 lg:col-span-2">
              <SectionHeader eyebrow="Send a Message" title="We'd Love to Hear From You" center={false} light />

              {sent ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#F9913E]/35 bg-[#F9913E]/12 text-[#FFC48A]">
                    <Send size={24} strokeWidth={1.6} />
                  </div>
                  <h3 className="aq-display mb-3 text-[24px] text-[#EAF4F8]">Message Sent!</h3>
                  <p className="text-[14px] text-[#8FB0C2]">
                    Your message was redirected to WhatsApp. We&apos;ll respond shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="aq-label">Full Name *</label>
                      <input
                        id="name" type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="aq-input" placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="aq-label">Email Address *</label>
                      <input
                        id="email" type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="aq-input" placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="aq-label">Subject *</label>
                    <select
                      id="subject" required value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="aq-input"
                    >
                      <option value="" className="bg-[#072334]">Select a topic</option>
                      {["Booking Inquiry", "Activity Information", "Pricing & Packages", "Safety Information", "Other"].map((o) => (
                        <option key={o} className="bg-[#072334]">{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="aq-label">Message *</label>
                    <textarea
                      id="message" required rows={6} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="aq-input resize-none"
                      placeholder="Tell us your activity interest, group size, and preferred dates..."
                    />
                  </div>

                  <button type="submit" className="aq-btn !w-full">
                    <Send size={16} /> Send via WhatsApp
                  </button>

                  <p className="text-center text-[12px] text-[#6E90A4]">
                    Your message will be sent via WhatsApp for fastest response
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps — dimmed so it sits in the same water as the rest of the page */}
      <section className="relative h-80 overflow-hidden border-t border-white/10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.0898!2d115.2283!3d-8.7562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDUnMjIuMyJTIDExNcKwMTMnNDIuMSJF!5e0!3m2!1sen!2sid!4v1234567890"
          className="h-full w-full border-0 grayscale-[0.4] contrast-[1.05] [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.7)]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bali Water Activity Location"
        />
      </section>
    </div>
  );
}
