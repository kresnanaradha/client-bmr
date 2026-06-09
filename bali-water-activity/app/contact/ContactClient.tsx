"use client";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const WA_NUMBER = "628XXXXXXXXXX";

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
    <>
      {/* Hero */}
      <section className="gradient-hero py-24 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest">Get In Touch</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">Contact Us</h1>
          <p className="text-blue-200 mt-3 max-w-lg mx-auto">Have a question or ready to book? Reach out via WhatsApp, email, or the form below — we respond fast!</p>
        </div>
      </section>

      <section className="py-16 bg-[#F0F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              <h2 className="font-bold text-xl text-[#0C1A4A] mb-5">Reach Out To Us</h2>
              {[
                { icon: Phone, label: "WhatsApp", value: "+62 8XX-XXXX-XXXX", sub: "Online daily 8:00–20:00 WITA", href: `https://wa.me/${WA_NUMBER}` },
                { icon: Mail, label: "Email", value: "hello@baliwateractivity.com", sub: "Response within 24 hours", href: "mailto:hello@baliwateractivity.com" },
                { icon: MapPin, label: "Location", value: "Tanjung Benoa, Nusa Dua", sub: "Bali, Indonesia 80363", href: "#" },
                { icon: Clock, label: "Operating Hours", value: "Daily 08:00 – 17:00 WITA", sub: "Open 7 days a week", href: "#" },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 card-hover">
                  <div className="w-10 h-10 gradient-card rounded-xl flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0C1A4A]">{c.label}</p>
                    <p className="text-[#1A2FB0] text-sm">{c.value}</p>
                    <p className="text-[#475569] text-xs">{c.sub}</p>
                  </div>
                </a>
              ))}
              <a href={`https://wa.me/${WA_NUMBER}?text=Hi%20Bali%20Water%20Activity!%20I%20have%20a%20question.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe59] text-white text-center font-semibold py-3.5 rounded-full transition-colors duration-200 cursor-pointer mt-4">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Message Us on WhatsApp
              </a>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <SectionHeader eyebrow="Send a Message" title="We'd Love to Hear From You" center={false} />
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 gradient-card rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0C1A4A] mb-2">Message Sent!</h3>
                  <p className="text-[#475569]">Your message was redirected to WhatsApp. We&apos;ll respond shortly!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#0C1A4A] mb-1.5">Full Name *</label>
                      <input id="name" type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C1A4A] focus:outline-none focus:ring-2 focus:ring-[#1A2FB0] transition-all"
                        placeholder="John Smith" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#0C1A4A] mb-1.5">Email Address *</label>
                      <input id="email" type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C1A4A] focus:outline-none focus:ring-2 focus:ring-[#1A2FB0] transition-all"
                        placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#0C1A4A] mb-1.5">Subject *</label>
                    <select id="subject" required value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C1A4A] focus:outline-none focus:ring-2 focus:ring-[#1A2FB0] transition-all">
                      <option value="">Select a topic</option>
                      <option>Booking Inquiry</option>
                      <option>Activity Information</option>
                      <option>Pricing & Packages</option>
                      <option>Safety Information</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#0C1A4A] mb-1.5">Message *</label>
                    <textarea id="message" required rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0C1A4A] focus:outline-none focus:ring-2 focus:ring-[#1A2FB0] transition-all resize-none"
                      placeholder="Tell us your activity interest, group size, and preferred dates..." />
                  </div>
                  <button type="submit"
                    className="w-full gradient-sunset text-white font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 cursor-pointer">
                    <Send size={16} /> Send via WhatsApp
                  </button>
                  <p className="text-xs text-[#475569] text-center">Your message will be sent via WhatsApp for fastest response</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="h-80 bg-gray-200 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.0898!2d115.2283!3d-8.7562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDUnMjIuMyJTIDExNcKwMTMnNDIuMSJF!5e0!3m2!1sen!2sid!4v1234567890"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bali Water Activity Location"
        />
      </section>
    </>
  );
}
