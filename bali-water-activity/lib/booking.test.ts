import { describe, expect, test } from "vitest";
import {
  bookingReference,
  bookingTotal,
  buildBookingMessage,
  minimumBookingDate,
  parsePrice,
  toDateInput,
  validateBooking,
  type BookingDetails,
} from "./booking";

function detailsFor(overrides: Partial<BookingDetails> = {}): BookingDetails {
  return {
    guestName: "Marcus Chen",
    guestPhone: "+61 400 123 456",
    guestEmail: "marcus@example.com",
    date: "2099-01-01",
    timeSlot: "09:00 – 10:00",
    hotel: "",
    notes: "",
    items: [{ name: "Parasailing", pax: 2, unitPrice: 350_000 }],
    ...overrides,
  };
}

describe("parsePrice", () => {
  // Regression: the shorthand branch once failed to match, so "Rp350K" was read
  // as 350 rupiah instead of 350,000 — a 1000x understatement on every quote.
  test("expands the K shorthand to thousands", () => {
    expect(parsePrice("Rp350K")).toBe(350_000);
    expect(parsePrice("Rp50K")).toBe(50_000);
  });

  test("handles thousands separators inside the shorthand", () => {
    expect(parsePrice("Rp1,500K")).toBe(1_500_000);
    expect(parsePrice("Rp2,500K")).toBe(2_500_000);
  });

  test("reads full rupiah amounts without the shorthand", () => {
    expect(parsePrice("IDR 90,000")).toBe(90_000);
    expect(parsePrice("IDR 600,000")).toBe(600_000);
  });

  test("returns 0 for prices it cannot read, rather than guessing", () => {
    expect(parsePrice("Free")).toBe(0);
    expect(parsePrice("")).toBe(0);
    expect(parsePrice("On request")).toBe(0);
  });

  test("does not treat a K elsewhere in the string as the shorthand", () => {
    expect(parsePrice("IDR 90,000 Komodo")).toBe(90_000);
  });
});

describe("bookingTotal", () => {
  test("multiplies unit price by pax across every item", () => {
    expect(
      bookingTotal([
        { name: "Parasailing", pax: 2, unitPrice: 350_000 },
        { name: "Jet Ski", pax: 3, unitPrice: 150_000 },
      ])
    ).toBe(1_150_000);
  });

  test("is zero for an empty basket", () => {
    expect(bookingTotal([])).toBe(0);
  });
});

describe("bookingReference", () => {
  test("uses the BWA prefix and a minute-precision timestamp", () => {
    const reference = bookingReference(new Date("2026-10-15T09:30:00Z"));
    expect(reference).toBe("BWA-202610150930");
  });

  test("is unique across different minutes", () => {
    const a = bookingReference(new Date("2026-10-15T09:30:00Z"));
    const b = bookingReference(new Date("2026-10-15T09:31:00Z"));
    expect(a).not.toBe(b);
  });
});

describe("minimumBookingDate", () => {
  test("allows same-day booking before the 11:00 cut-off", () => {
    const morning = new Date(2026, 9, 15, 9, 0);
    expect(minimumBookingDate(morning)).toBe("2026-10-15");
  });

  test("pushes to tomorrow once the cut-off has passed", () => {
    const afternoon = new Date(2026, 9, 15, 11, 0);
    expect(minimumBookingDate(afternoon)).toBe("2026-10-16");
  });

  test("rolls over the month boundary correctly", () => {
    const lastDay = new Date(2026, 9, 31, 15, 0);
    expect(minimumBookingDate(lastDay)).toBe("2026-11-01");
  });
});

describe("toDateInput", () => {
  test("zero-pads month and day for the date input", () => {
    expect(toDateInput(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("validateBooking", () => {
  const morning = new Date(2026, 9, 15, 9, 0);

  test("accepts a complete booking", () => {
    expect(validateBooking(detailsFor(), morning).valid).toBe(true);
  });

  test("rejects a missing or one-character name", () => {
    expect(validateBooking(detailsFor({ guestName: "" }), morning).errors.guestName).toBeDefined();
    expect(validateBooking(detailsFor({ guestName: "A" }), morning).errors.guestName).toBeDefined();
  });

  test("accepts international numbers in the formats guests actually type", () => {
    for (const phone of ["+65 9123 4567", "6281234567890", "+62 812-3456-7890", "(61) 400123456"]) {
      const result = validateBooking(detailsFor({ guestPhone: phone }), morning);
      expect(result.errors.guestPhone, `expected ${phone} to be accepted`).toBeUndefined();
    }
  });

  test("rejects numbers that are too short or not numeric", () => {
    for (const phone of ["12345", "not a phone", ""]) {
      const result = validateBooking(detailsFor({ guestPhone: phone }), morning);
      expect(result.errors.guestPhone, `expected ${phone} to be rejected`).toBeDefined();
    }
  });

  test("treats email as optional but validates it when present", () => {
    expect(validateBooking(detailsFor({ guestEmail: "" }), morning).errors.guestEmail).toBeUndefined();
    expect(
      validateBooking(detailsFor({ guestEmail: "not-an-email" }), morning).errors.guestEmail
    ).toBeDefined();
  });

  test("rejects a date before the same-day cut-off allows", () => {
    const afternoon = new Date(2026, 9, 15, 14, 0);
    const result = validateBooking(detailsFor({ date: "2026-10-15" }), afternoon);
    expect(result.errors.date).toContain("11:00");
  });

  test("allows today when booking before the cut-off", () => {
    expect(validateBooking(detailsFor({ date: "2026-10-15" }), morning).errors.date).toBeUndefined();
  });

  test("requires a time slot", () => {
    expect(validateBooking(detailsFor({ timeSlot: "" }), morning).errors.timeSlot).toBeDefined();
  });

  test("requires at least one participant", () => {
    expect(validateBooking(detailsFor({ items: [] }), morning).errors.items).toBeDefined();
    expect(
      validateBooking(
        detailsFor({ items: [{ name: "Parasailing", pax: 0, unitPrice: 350_000 }] }),
        morning
      ).errors.items
    ).toBeDefined();
  });
});

describe("buildBookingMessage", () => {
  const reference = "BWA-202610150930";

  test("matches the payload the operator expects", () => {
    const message = buildBookingMessage(
      detailsFor({ date: "2026-10-15", hotel: "Grand Hyatt Bali", notes: "Vegetarian meals" }),
      reference
    );

    expect(message).toContain("*Booking Reference:* BWA-202610150930");
    expect(message).toContain("*Lead Guest:* Marcus Chen");
    expect(message).toContain("*Contact:* +61 400 123 456 / marcus@example.com");
    expect(message).toContain("*Date of Activity:* 2026-10-15");
    expect(message).toContain("*Preferred Time:* 09:00 – 10:00");
    expect(message).toContain("- Parasailing (2 Pax) - Est. IDR 700.000");
    expect(message).toContain("*Estimated Total:* IDR 700.000");
    expect(message).toContain("*Hotel / Pickup:* Grand Hyatt Bali");
    expect(message).toContain("*Notes:* Vegetarian meals");
  });

  test("omits the email separator when no email was given", () => {
    const message = buildBookingMessage(detailsFor({ guestEmail: "" }), reference);
    expect(message).toContain("*Contact:* +61 400 123 456\n");
  });

  test("falls back to placeholders for optional fields", () => {
    const message = buildBookingMessage(detailsFor({ hotel: "", notes: "" }), reference);
    expect(message).toContain("*Hotel / Pickup:* None");
    expect(message).toContain("*Notes:* -");
  });

  test("lists every activity in the basket", () => {
    const message = buildBookingMessage(
      detailsFor({
        items: [
          { name: "Parasailing", pax: 2, unitPrice: 350_000 },
          { name: "Jet Ski", pax: 1, unitPrice: 150_000 },
        ],
      }),
      reference
    );
    expect(message).toContain("- Parasailing (2 Pax)");
    expect(message).toContain("- Jet Ski (1 Pax)");
    expect(message).toContain("*Estimated Total:* IDR 850.000");
  });

  // A wrong total is worse than no total, so unreadable prices drop the estimate.
  test("omits the estimate entirely when prices are unknown", () => {
    const message = buildBookingMessage(
      detailsFor({ items: [{ name: "Custom Charter", pax: 4, unitPrice: 0 }] }),
      reference
    );
    expect(message).toContain("- Custom Charter (4 Pax)");
    expect(message).not.toContain("Est. IDR");
    expect(message).not.toContain("*Estimated Total:*");
  });
});
