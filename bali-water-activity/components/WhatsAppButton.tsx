"use client";
import { useCallback, useState, useSyncExternalStore } from "react";
import { X, MessageCircle } from "lucide-react";
import { BUSINESS, WA_NUMBER, isWithinOpeningHours } from "@/lib/config";
import { trackContactWhatsApp } from "@/lib/analytics";

const WA_MESSAGE = "Hi Bali Water Activity! I'd like to get more information and book an activity.";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  // Server renders null (neutral label); the client resolves the real state on
  // hydration and re-checks each minute so the badge stays accurate.
  const subscribe = useCallback((onChange: () => void) => {
    const id = window.setInterval(onChange, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const isOpenNow = useSyncExternalStore(
    subscribe,
    () => isWithinOpeningHours(),
    () => null
  );

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full gradient-card flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#0C1A4A]">Bali Water Activity</p>
                <p className={`text-xs flex items-center gap-1 ${isOpenNow ? "text-green-500" : "text-slate-400"}`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${isOpenNow ? "bg-green-500" : "bg-slate-300"}`} />
                  {isOpenNow === null
                    ? `${BUSINESS.openHour}–${BUSINESS.closeHour} ${BUSINESS.timezone}`
                    : isOpenNow
                      ? "Open now"
                      : `Closed · opens ${BUSINESS.openHour} ${BUSINESS.timezone}`}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-[#475569] bg-[#F0F9FF] rounded-xl p-3 mb-3">
            Hi there! Send us a message and we’ll confirm your booking during opening hours.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactWhatsApp("floating_button")}
            className="block w-full bg-[#25D366] hover:bg-[#1ebe59] text-white text-center py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200 cursor-pointer"
          >
            Start Chat
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        className="bg-[#25D366] hover:bg-[#1ebe59] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>
    </div>
  );
}
