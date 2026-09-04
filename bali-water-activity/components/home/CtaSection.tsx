import { ArrowRight, MessageCircle, Shield } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

const WA_MSG = "Hi Bali Water Activity! I'm ready to book an adventure. Can you help me choose the best activity?";

export default function CtaSection() {
  return (
    <section className="section-gap bg-gradient-to-b from-[#F8FAFC] to-[#eef6ff]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative glass-card border border-[#d7e6f7] rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center bg-gradient-to-b from-white to-[#eaf4ff] text-[#10233f] shadow-2xl shadow-sky-100/80"
        >
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-20 bg-[#7cc4ff]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c67a00] mb-5">
              <span className="w-6 h-px bg-[#c67a00]" />
              Ready for Adventure?
              <span className="w-6 h-px bg-[#c67a00]" />
            </span>

            <h2 className="font-display text-display-lg text-[#10233f] mb-4">
              Book Your Bali Adventure
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-golden to-orange font-bold">in Just 2 Minutes</span>
            </h2>

            <p className="text-[#3d536f] text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Chat with us on WhatsApp, pick your activity, and pay on arrival.
              It&apos;s that simple. Our team is online and ready to help!
            </p>

            <WhatsAppLink
          message={WA_MSG}
          source="homepage_cta"
          className="gradient-sunset text-white w-full sm:w-auto sm:min-w-[320px] max-w-full font-bold px-6 sm:px-8 py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-orange-500/35 hover:scale-105 transition-all duration-200 cursor-pointer text-sm sm:text-base text-center"
        >
              <MessageCircle size={20} />
              Chat on WhatsApp Now
              <ArrowRight size={18} />
            </WhatsAppLink>

            <p className="text-[#5f738d] text-xs mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-green-400" /> No upfront payment</span>
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-green-400" /> Instant confirmation</span>
              <span className="flex items-center gap-1.5"><Shield size={12} className="text-green-400" /> Free cancellation</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
