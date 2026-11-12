import { describe, it, expect } from "vitest";
import { overlaps } from "./overlap.js";

const t = (time: string) => new Date(`2026-12-01T${time}:00.000Z`);

describe("overlaps", () => {
  it("detects a partial overlap", () => {
    expect(overlaps(t("10:00"), t("11:00"), t("10:30"), t("11:30"))).toBe(true);
  });

  it("allows back-to-back bookings", () => {
    expect(overlaps(t("10:00"), t("11:00"), t("11:00"), t("11:30"))).toBe(false);
  });
});