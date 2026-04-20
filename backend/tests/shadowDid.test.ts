import { describe, it, expect } from "vitest";
import { computeShadowDID, generateDidSalt } from "../src/lib/shadowDid";

describe("generateDidSalt", () => {
  it("generates a 32-character hex string", () => {
    const salt = generateDidSalt();
    expect(salt).toHaveLength(32);
    expect(salt).toMatch(/^[0-9a-f]{32}$/);
  });

  it("generates unique salts", () => {
    const salts = new Set(Array.from({ length: 100 }, () => generateDidSalt()));
    expect(salts.size).toBe(100);
  });
});

describe("computeShadowDID", () => {
  const secret = "a".repeat(64);

  it("is deterministic for same inputs", () => {
    const salt = "test-salt";
    const did1 = computeShadowDID("test@example.com", salt, secret);
    const did2 = computeShadowDID("test@example.com", salt, secret);
    expect(did1).toBe(did2);
  });

  it("normalizes email to lowercase", () => {
    const salt = "test-salt";
    const did1 = computeShadowDID("TEST@EXAMPLE.COM", salt, secret);
    const did2 = computeShadowDID("test@example.com", salt, secret);
    expect(did1).toBe(did2);
  });

  it("trims email whitespace", () => {
    const salt = "test-salt";
    const did1 = computeShadowDID("  test@example.com  ", salt, secret);
    const did2 = computeShadowDID("test@example.com", salt, secret);
    expect(did1).toBe(did2);
  });

  it("produces different DIDs for different emails", () => {
    const salt = "test-salt";
    const did1 = computeShadowDID("alice@example.com", salt, secret);
    const did2 = computeShadowDID("bob@example.com", salt, secret);
    expect(did1).not.toBe(did2);
  });

  it("produces different DIDs for same email with different salts", () => {
    const did1 = computeShadowDID("test@example.com", "salt-a", secret);
    const did2 = computeShadowDID("test@example.com", "salt-b", secret);
    expect(did1).not.toBe(did2);
  });

  it("produces different DIDs for same email+salt with different secrets", () => {
    const salt = "test-salt";
    const did1 = computeShadowDID("test@example.com", salt, "a".repeat(64));
    const did2 = computeShadowDID("test@example.com", salt, "b".repeat(64));
    expect(did1).not.toBe(did2);
  });

  it("produces a 64-character hex string", () => {
    const did = computeShadowDID("test@example.com", "salt", secret);
    expect(did).toHaveLength(64);
    expect(did).toMatch(/^[0-9a-f]{64}$/);
  });
});
