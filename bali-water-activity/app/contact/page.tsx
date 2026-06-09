import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us – Bali Water Activity",
  description:
    "Get in touch with Bali Water Activity. Book via WhatsApp, send an email, or fill out our contact form. We respond fast!",
};

export default function ContactPage() {
  return <ContactClient />;
}
