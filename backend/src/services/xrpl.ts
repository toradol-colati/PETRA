import { Client, Wallet, convertStringToHex } from "xrpl";
import type { Payment } from "xrpl";
import pino from "pino";
import { env } from "../lib/env";

const logger = pino({ level: env.LOG_LEVEL });

const XRPL_SERVERS: Record<string, string> = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233",
  mainnet: "wss://xrplcluster.com",
};

export async function anchorBatch(
  rootHash: string
): Promise<{ txHash: string }> {
  const server = XRPL_SERVERS[env.XRPL_NETWORK];
  const client = new Client(server);

  try {
    await client.connect();
    logger.info({ network: env.XRPL_NETWORK }, "Connected to XRPL");

    const wallet = Wallet.fromSeed(env.XRPL_MASTER_SEED);

    const payment: Payment = {
      TransactionType: "Payment",
      Account: wallet.address,
      Destination: wallet.address,
      Amount: "1",
      Memos: [
        {
          Memo: {
            MemoType: convertStringToHex("petra/merkle-root"),
            MemoData: convertStringToHex(rootHash),
          },
        },
      ],
    };

    const prepared = await client.autofill(payment);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const meta = result.result.meta;
    if (
      typeof meta !== "string" &&
      meta?.TransactionResult !== "tesSUCCESS"
    ) {
      throw new Error(
        `XRPL transaction failed: ${meta?.TransactionResult}`
      );
    }

    const txHash = result.result.hash;
    logger.info({ txHash, rootHash }, "Merkle root anchored on XRPL");

    return { txHash };
  } finally {
    await client.disconnect();
  }
}

export function getExplorerUrl(txHash: string): string {
  const prefix =
    env.XRPL_NETWORK === "mainnet" ? "" : `${env.XRPL_NETWORK}.`;
  return `https://${prefix}xrpl.org/transactions/${txHash}`;
}
