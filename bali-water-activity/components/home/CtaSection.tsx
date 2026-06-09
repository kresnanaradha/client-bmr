import { ArrowRight, MessageCircle, Shield } from "lucide-react";

const WA_NUMBER = "628XXXXXXXXXX";
const WA_MSG = "Hi Bali Water Activity! I'm ready to book an adventure. Can you help me choose the best activity?";

export default function CtaSection() {
  return (
    <section className="section-gap bg-gradient-to-b from-[#F8FAFC] to-[#eef6ff]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative glass-card border border-white/10 rounded-3xl overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center bg-gradient-to-b from-[#0F1419] to-[#1A3D8C] text-white shadow-2xl"
        >
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-25 bg-[#0052CC]" />
          </div>

          {/* Gold accent line at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 rounded-full bg-[#FFD700]" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFD700] mb-5">
              <span className="w-6 h-px bg-[#FFD700]" />
              Ready for Adventure?
              <span className="w-6 h-px bg-[#FFD700]" />
            </span>

            <h2 className="font-display text-display-lg text-white mb-4">
              Book Your Bali Adventure
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF9500] font-bold">in Just 2 Minutes</span>
            </h2>

            <p className="text-white/70 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Chat with us on WhatsApp, pick your activity, and pay on arrival.
              It&apos;s that simple. Our team is online and ready to help!
            </p>

            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary gradient-sunset text-white hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp Now
              <ArrowRight size={18} />
            </a>

            <p className="text-white/50 text-xs mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
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
