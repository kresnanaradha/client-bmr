import { WA_NUMBER } from "@/lib/site";
import { ArrowRight, MessageCircle, Shield } from "lucide-react";

const WA_MSG = "Hi Bali Water Activity! I'm ready to book an adventure. Can you help me choose the best activity?";

export default function CtaSection() {
  return (
    <section className="section-gap relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="aq-panel relative overflow-hidden px-8 py-20 text-center md:px-16 md:py-24">
          {/* Warm light rising from below, like the surface lit at sunset */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-24 left-1/2 h-[320px] w-[620px] max-w-[130%] -translate-x-1/2 rounded-full bg-[#F9913E]/18 blur-[90px]" />
            <div className="absolute -top-20 left-1/2 h-[240px] w-[520px] max-w-[120%] -translate-x-1/2 rounded-full bg-[#3ED6E0]/12 blur-[80px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="aq-eyebrow mb-7">Ready for Adventure?</span>

            <h2 className="aq-display text-display-lg mb-6 text-[#EAF4F8]">
              Book Your Bali Adventure
              <br />
              <span className="aq-accent-text font-semibold">in Just 2 Minutes</span>
            </h2>

            <p className="mx-auto mb-11 max-w-xl text-[15px] leading-[1.8] text-[#8FB0C2]">
              Chat with us on WhatsApp, pick your activity, and pay on arrival.
              It&apos;s that simple. Our team is online and ready to help!
            </p>

            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="aq-btn w-full max-w-full sm:w-auto sm:min-w-[320px]"
            >
              <MessageCircle size={19} />
              Chat on WhatsApp Now
              <ArrowRight size={17} />
            </a>

            <p className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-2.5 text-[12px] text-[#6E90A4]">
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-[#3ED6E0]" /> No upfront payment</span>
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-[#3ED6E0]" /> Instant confirmation</span>
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-[#3ED6E0]" /> Free cancellation</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
