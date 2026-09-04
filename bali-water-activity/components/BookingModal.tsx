"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X, MessageCircle, Minus, Plus, AlertCircle } from "lucide-react";
import {
  BookingDetails,
  TIME_SLOTS,
  bookingReference,
  bookingTotal,
  buildBookingLink,
  formatIDR,
  minimumBookingDate,
  parsePrice,
  validateBooking,
} from "@/lib/booking";
import { trackGenerateLead } from "@/lib/analytics";
import { IS_WA_CONFIGURED } from "@/lib/config";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  activity: { slug: string; title: string; price: string; category?: string };
}

const emptyDetails = (): BookingDetails => ({
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  date: "",
  timeSlot: "",
  hotel: "",
  notes: "",
  items: [],
});

export default function BookingModal({ open, onClose, activity }: BookingModalProps) {
  const [pax, setPax] = useState(2);
  const [details, setDetails] = useState<BookingDetails>(emptyDetails);
  const [errors, setErrors] = useState<ReturnType<typeof validateBooking>["errors"]>({});
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  const unitPrice = parsePrice(activity.price);
  const total = bookingTotal([{ name: activity.title, pax, unitPrice }]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = <K extends keyof BookingDetails>(key: K, value: BookingDetails[K]) => {
    setDetails((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    const payload: BookingDetails = {
      ...details,
      items: [{ name: activity.title, pax, unitPrice }],
    };

    const result = validateBooking(payload);
    setErrors(result.errors);
    if (!result.valid) return;

    const reference = bookingReference();

    trackGenerateLead({
      reference,
      value: total,
      items: [{ id: activity.slug, name: activity.title, pax, price: unitPrice }],
    });

    window.open(buildBookingLink(payload, reference), "_blank", "noopener,noreferrer");
    onClose();
  };

  const fieldError = (key: keyof BookingDetails) =>
    submitted && errors[key] ? (
      <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
        <AlertCircle size={12} /> {errors[key]}
      </p>
    ) : null;

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20";
  const labelClass = "mb-1.5 block text-xs font-semibold text-slate-700";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white shadow-2xl outline-none sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Reserve your slot</p>
            <h2 id={`${formId}-title`} className="font-display text-2xl leading-tight text-dark-navy">
              {activity.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking form"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 px-6 py-5">
          <div>
            <label className={labelClass}>Number of participants</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPax((n) => Math.max(1, n - 1))}
                aria-label="Decrease participants"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
                disabled={pax <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-lg font-bold text-dark-navy">{pax}</span>
              <button
                type="button"
                onClick={() => setPax((n) => Math.min(30, n + 1))}
                aria-label="Increase participants"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
                disabled={pax >= 30}
              >
                <Plus size={14} />
              </button>
              {unitPrice > 0 && (
                <div className="ml-auto text-right">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Estimated total</p>
                  <p className="text-lg font-bold leading-none text-dark-navy">IDR {formatIDR(total)}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-name`} className={labelClass}>
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              id={`${formId}-name`}
              className={inputClass}
              value={details.guestName}
              onChange={(e) => update("guestName", e.target.value)}
              placeholder="As shown on your ID"
              autoComplete="name"
            />
            {fieldError("guestName")}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-phone`} className={labelClass}>
                WhatsApp number <span className="text-red-500">*</span>
              </label>
              <input
                id={`${formId}-phone`}
                className={inputClass}
                value={details.guestPhone}
                onChange={(e) => update("guestPhone", e.target.value)}
                placeholder="+65 9123 4567"
                inputMode="tel"
                autoComplete="tel"
              />
              {fieldError("guestPhone")}
            </div>
            <div>
              <label htmlFor={`${formId}-email`} className={labelClass}>
                Email <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id={`${formId}-email`}
                className={inputClass}
                value={details.guestEmail}
                onChange={(e) => update("guestEmail", e.target.value)}
                placeholder="you@example.com"
                inputMode="email"
                autoComplete="email"
              />
              {fieldError("guestEmail")}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-date`} className={labelClass}>
                Activity date <span className="text-red-500">*</span>
              </label>
              <input
                id={`${formId}-date`}
                type="date"
                className={inputClass}
                min={minimumBookingDate()}
                value={details.date}
                onChange={(e) => update("date", e.target.value)}
              />
              {fieldError("date")}
            </div>
            <div>
              <label htmlFor={`${formId}-slot`} className={labelClass}>
                Preferred time <span className="text-red-500">*</span>
              </label>
              <select
                id={`${formId}-slot`}
                className={inputClass}
                value={details.timeSlot}
                onChange={(e) => update("timeSlot", e.target.value)}
              >
                <option value="">Select a slot</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot} WITA
                  </option>
                ))}
              </select>
              {fieldError("timeSlot")}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-hotel`} className={labelClass}>
              Hotel / pickup location <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              id={`${formId}-hotel`}
              className={inputClass}
              value={details.hotel}
              onChange={(e) => update("hotel", e.target.value)}
              placeholder="e.g. The Anvaya, Kuta"
            />
          </div>

          <div>
            <label htmlFor={`${formId}-notes`} className={labelClass}>
              Special requests <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id={`${formId}-notes`}
              rows={2}
              className={`${inputClass} resize-none`}
              value={details.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Group discount, children joining, dietary needs…"
            />
          </div>

          {!IS_WA_CONFIGURED && (
            <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-xs text-amber-800">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              WhatsApp number is not configured yet. Set NEXT_PUBLIC_WA_NUMBER before going live.
            </p>
          )}

          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full gradient-sunset px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
          >
            <MessageCircle size={16} />
            Confirm &amp; Lock Price via WhatsApp
          </button>

          <p className="text-center text-[11px] leading-relaxed text-slate-500">
            No upfront payment. We reply on WhatsApp to confirm your slot and the final price.
          </p>
        </form>
      </div>
    </div>
  );
}
