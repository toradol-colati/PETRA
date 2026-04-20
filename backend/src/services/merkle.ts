import { createHash } from "crypto";

export function sha256(data: string): string {
  return createHash("sha256").update(data).digest("hex");
}

export function computeLeafHash(
  donationId: string,
  amount: number,
  nonce: string,
  timestamp: string
): string {
  const payload = `${donationId}:${amount}:${nonce}:${timestamp}`;
  return sha256(payload);
}

export function merkleRoot(leaves: string[]): string {
  if (leaves.length === 0) {
    throw new Error("Cannot compute Merkle root of empty leaf set");
  }
  if (leaves.length === 1) {
    return leaves[0];
  }

  const sortedLeaves = [...leaves].sort();
  return buildTree(sortedLeaves);
}

function buildTree(nodes: string[]): string {
  if (nodes.length === 1) {
    return nodes[0];
  }

  const nextLevel: string[] = [];

  for (let i = 0; i < nodes.length; i += 2) {
    const left = nodes[i];
    const right = i + 1 < nodes.length ? nodes[i + 1] : left;

    const combined = left < right ? left + right : right + left;
    nextLevel.push(sha256(combined));
  }

  return buildTree(nextLevel);
}

export function generateMerkleProof(
  leaves: string[],
  targetLeaf: string
): { proof: string[]; index: number } | null {
  const sortedLeaves = [...leaves].sort();
  const index = sortedLeaves.indexOf(targetLeaf);

  if (index === -1) return null;

  const proof: string[] = [];
  let currentLevel = sortedLeaves;
  let currentIndex = index;

  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];

    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left;

      if (i === currentIndex || i + 1 === currentIndex) {
        const sibling = i === currentIndex ? right : left;
        proof.push(sibling);
      }

      const combined = left < right ? left + right : right + left;
      nextLevel.push(sha256(combined));
    }

    currentIndex = Math.floor(currentIndex / 2);
    currentLevel = nextLevel;
  }

  return { proof, index };
}

export function verifyMerkleProof(
  leaf: string,
  proof: string[],
  root: string
): boolean {
  let current = leaf;

  for (const sibling of proof) {
    const combined =
      current < sibling ? current + sibling : sibling + current;
    current = sha256(combined);
  }

  return current === root;
}
