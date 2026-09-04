"use client";

import { waLink } from "@/lib/config";
import { trackContactWhatsApp } from "@/lib/analytics";

interface WhatsAppLinkProps {
  message: string;
  /** Identifies which CTA was used, so enquiry sources are separable in GA4. */
  source: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A plain "chat with us" WhatsApp link — an enquiry, not a booking. Bookings go
 * through BookNowButton so they carry guest details.
 */
export default function WhatsAppLink({ message, source, className, children }: WhatsAppLinkProps) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactWhatsApp(source)}
      className={className}
    >
      {children}
    </a>
  );
}
