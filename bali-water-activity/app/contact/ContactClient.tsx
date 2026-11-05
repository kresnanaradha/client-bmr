"use client";
import { useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { waLink } from "@/lib/site";

const TOPICS = ["Booking", "Activity information", "Prices and packages", "Safety", "Something else"];

const fieldClass =
  "w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-muted/60 focus:border-ink";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", date: "", people: "", topic: TOPICS[0], message: "" });
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hi! I'm ${form.name}.`,
      `Topic: ${form.topic}`,
      ...(form.date ? [`Date: ${form.date}`] : []),
      ...(form.people ? [`People: ${form.people}`] : []),
      "",
      form.message,
    ];
    // Opened via window.open rather than a link, so the global click listener misses it.
    sendGAEvent("event", "whatsapp_click", { link_text: "Contact form" });
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border-t border-ink pt-10" role="status">
        <h2 className="t-section">
          WhatsApp <em>is open</em>
        </h2>
        <p className="mt-4 max-w-md text-lg text-muted">
          Your message is ready in WhatsApp. Press send there and we&apos;ll reply as soon as we can.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn btn-line mt-8">
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-ink pt-4">
      <div className="grid gap-x-8 sm:grid-cols-2">
        <label className="block pt-6">
          <span className="text-sm font-medium">Your name</span>
          <input required value={form.name} onChange={update("name")} autoComplete="name" className={fieldClass} />
        </label>
        <label className="block pt-6">
          <span className="text-sm font-medium">Topic</span>
          <select value={form.topic} onChange={update("topic")} className={fieldClass}>
            {TOPICS.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </label>
        <label className="block pt-6">
          <span className="text-sm font-medium">
            Date <span className="font-normal text-muted">(optional)</span>
          </span>
          <input type="date" value={form.date} onChange={update("date")} className={fieldClass} />
        </label>
        <label className="block pt-6">
          <span className="text-sm font-medium">
            Number of people <span className="font-normal text-muted">(optional)</span>
          </span>
          <input type="number" min={1} inputMode="numeric" value={form.people} onChange={update("people")} className={fieldClass} />
        </label>
      </div>
      <label className="block pt-6">
        <span className="text-sm font-medium">Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Which activity, ages, anything we should know"
          className={`${fieldClass} resize-none`}
        />
      </label>
      <button type="submit" className="btn btn-whatsapp mt-10 w-full sm:w-auto">
        Continue in WhatsApp
      </button>
    </form>
  );
}
