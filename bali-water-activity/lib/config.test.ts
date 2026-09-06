import { describe, expect, test } from "vitest";
import { isWithinOpeningHours, waLink } from "./config";

// Bali is UTC+8 year round, so 09:00-16:00 WITA is 01:00-08:00 UTC.
describe("isWithinOpeningHours", () => {
  test("is open at the start of the day", () => {
    expect(isWithinOpeningHours(new Date("2026-10-15T01:00:00Z"))).toBe(true);
  });

  test("is open through the middle of the day", () => {
    expect(isWithinOpeningHours(new Date("2026-10-15T04:30:00Z"))).toBe(true);
  });

  test("is closed exactly at closing time", () => {
    expect(isWithinOpeningHours(new Date("2026-10-15T08:00:00Z"))).toBe(false);
  });

  test("is closed before opening", () => {
    expect(isWithinOpeningHours(new Date("2026-10-15T00:59:00Z"))).toBe(false);
  });

  test("is closed overnight, including across the UTC date boundary", () => {
    expect(isWithinOpeningHours(new Date("2026-10-15T17:00:00Z"))).toBe(false);
    expect(isWithinOpeningHours(new Date("2026-10-15T23:30:00Z"))).toBe(false);
  });
});

describe("waLink", () => {
  test("encodes the message into a wa.me link", () => {
    const link = waLink("Hi there!");
    expect(link.startsWith("https://wa.me/")).toBe(true);
    expect(link).toContain("?text=Hi%20there!");
  });

  test("escapes characters that would break the query string", () => {
    expect(waLink("a&b=c")).toContain("a%26b%3Dc");
  });
});
