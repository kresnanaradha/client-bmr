"use client";

import { useEffect } from "react";
import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { GA_ID } from "@/lib/site";

/**
 * Loads Google Analytics and records every click on a WhatsApp link as a
 * `whatsapp_click` event. Listening at the document level covers every link on
 * the site (navbar, cards, footer, floating button) without editing each one.
 * GA attaches the page path and visitor country automatically, which is what
 * the dashboard uses to show which pages and countries turn into contacts.
 */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href*="wa.me/"]');
      if (!link) return;
      sendGAEvent("event", "whatsapp_click", {
        link_text: link.textContent?.trim().slice(0, 60) ?? "",
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null;
}
