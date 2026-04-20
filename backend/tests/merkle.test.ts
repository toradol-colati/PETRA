import { describe, it, expect } from "vitest";
import {
  sha256,
  computeLeafHash,
  merkleRoot,
  generateMerkleProof,
  verifyMerkleProof,
} from "../src/services/merkle";

describe("sha256", () => {
  it("produces consistent output for the same input", () => {
    const hash1 = sha256("hello");
    const hash2 = sha256("hello");
    expect(hash1).toBe(hash2);
  });

  it("produces different output for different inputs", () => {
    const hash1 = sha256("hello");
    const hash2 = sha256("world");
    expect(hash1).not.toBe(hash2);
  });

  it("produces a 64-character hex string", () => {
    const hash = sha256("test");
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("computeLeafHash", () => {
  it("is deterministic for the same inputs", () => {
    const h1 = computeLeafHash("id-1", 500, "nonce-1", "2026-01-01T00:00:00.000Z");
    const h2 = computeLeafHash("id-1", 500, "nonce-1", "2026-01-01T00:00:00.000Z");
    expect(h1).toBe(h2);
  });

  it("changes when amount changes (integer centesimi)", () => {
    const h1 = computeLeafHash("id-1", 500, "nonce-1", "2026-01-01T00:00:00.000Z");
    const h2 = computeLeafHash("id-1", 501, "nonce-1", "2026-01-01T00:00:00.000Z");
    expect(h1).not.toBe(h2);
  });

  it("changes when nonce changes", () => {
    const h1 = computeLeafHash("id-1", 500, "nonce-1", "2026-01-01T00:00:00.000Z");
    const h2 = computeLeafHash("id-1", 500, "nonce-2", "2026-01-01T00:00:00.000Z");
    expect(h1).not.toBe(h2);
  });
});

describe("merkleRoot", () => {
  it("throws on empty leaves", () => {
    expect(() => merkleRoot([])).toThrow("Cannot compute Merkle root of empty leaf set");
  });

  it("returns the leaf itself for a single leaf", () => {
    const leaf = sha256("single");
    expect(merkleRoot([leaf])).toBe(leaf);
  });

  it("is deterministic regardless of input order", () => {
    const leaves = [sha256("a"), sha256("b"), sha256("c")];
    const reversed = [...leaves].reverse();
    expect(merkleRoot(leaves)).toBe(merkleRoot(reversed));
  });

  it("produces different roots for different leaf sets", () => {
    const root1 = merkleRoot([sha256("a"), sha256("b")]);
    const root2 = merkleRoot([sha256("a"), sha256("c")]);
    expect(root1).not.toBe(root2);
  });

  it("handles even number of leaves", () => {
    const leaves = [sha256("a"), sha256("b"), sha256("c"), sha256("d")];
    const root = merkleRoot(leaves);
    expect(root).toHaveLength(64);
  });

  it("handles odd number of leaves", () => {
    const leaves = [sha256("a"), sha256("b"), sha256("c")];
    const root = merkleRoot(leaves);
    expect(root).toHaveLength(64);
  });

  it("handles large number of leaves", () => {
    const leaves = Array.from({ length: 100 }, (_, i) => sha256(`leaf-${i}`));
    const root = merkleRoot(leaves);
    expect(root).toHaveLength(64);

    const root2 = merkleRoot(leaves);
    expect(root).toBe(root2);
  });
});

describe("merkle proof generation and verification", () => {
  it("generates and verifies a valid proof for 2 leaves", () => {
    const leaves = [sha256("a"), sha256("b")];
    const root = merkleRoot(leaves);
    const result = generateMerkleProof(leaves, leaves[0]);

    expect(result).not.toBeNull();
    expect(verifyMerkleProof(leaves[0], result!.proof, root)).toBe(true);
  });

  it("generates and verifies a valid proof for 4 leaves", () => {
    const leaves = [sha256("a"), sha256("b"), sha256("c"), sha256("d")];
    const root = merkleRoot(leaves);

    for (const leaf of leaves) {
      const result = generateMerkleProof(leaves, leaf);
      expect(result).not.toBeNull();
      expect(verifyMerkleProof(leaf, result!.proof, root)).toBe(true);
    }
  });

  it("generates and verifies a valid proof for 7 leaves", () => {
    const leaves = Array.from({ length: 7 }, (_, i) => sha256(`leaf-${i}`));
    const root = merkleRoot(leaves);

    for (const leaf of leaves) {
      const result = generateMerkleProof(leaves, leaf);
      expect(result).not.toBeNull();
      expect(verifyMerkleProof(leaf, result!.proof, root)).toBe(true);
    }
  });

  it("returns null for a leaf not in the set", () => {
    const leaves = [sha256("a"), sha256("b")];
    const result = generateMerkleProof(leaves, sha256("c"));
    expect(result).toBeNull();
  });

  it("fails verification with wrong root", () => {
    const leaves = [sha256("a"), sha256("b")];
    const result = generateMerkleProof(leaves, leaves[0]);
    const fakeRoot = sha256("fake");

    expect(result).not.toBeNull();
    expect(verifyMerkleProof(leaves[0], result!.proof, fakeRoot)).toBe(false);
  });

  it("fails verification with tampered leaf", () => {
    const leaves = [sha256("a"), sha256("b"), sha256("c")];
    const root = merkleRoot(leaves);
    const result = generateMerkleProof(leaves, leaves[0]);

    expect(result).not.toBeNull();
    expect(verifyMerkleProof(sha256("tampered"), result!.proof, root)).toBe(false);
  });
});
