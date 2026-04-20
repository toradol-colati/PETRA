import { describe, it, expect } from "vitest";
import { createDonationSchema } from "../src/schemas/donation";

describe("createDonationSchema", () => {
  const validInput = {
    amount: 500,
    currency: "EUR",
    locationId: "550e8400-e29b-41d4-a716-446655440000",
    email: "test@example.com",
  };

  it("accepts valid input", () => {
    const result = createDonationSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("defaults currency to EUR when not provided", () => {
    const { currency, ...withoutCurrency } = validInput;
    const result = createDonationSchema.safeParse(withoutCurrency);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.currency).toBe("EUR");
    }
  });

  it("rejects amount below minimum (350 centesimi = €3.50)", () => {
    const result = createDonationSchema.safeParse({ ...validInput, amount: 349 });
    expect(result.success).toBe(false);
  });

  it("rejects amount above maximum (100000 centesimi = €1000)", () => {
    const result = createDonationSchema.safeParse({ ...validInput, amount: 100001 });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer amounts (float centesimi)", () => {
    const result = createDonationSchema.safeParse({ ...validInput, amount: 500.5 });
    expect(result.success).toBe(false);
  });

  it("accepts minimum amount (350)", () => {
    const result = createDonationSchema.safeParse({ ...validInput, amount: 350 });
    expect(result.success).toBe(true);
  });

  it("accepts maximum amount (100000)", () => {
    const result = createDonationSchema.safeParse({ ...validInput, amount: 100000 });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = createDonationSchema.safeParse({ ...validInput, email: "not-email" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid locationId (not UUID)", () => {
    const result = createDonationSchema.safeParse({ ...validInput, locationId: "not-uuid" });
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const result = createDonationSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
