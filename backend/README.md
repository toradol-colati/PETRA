# PETRA Backend

Backend Node.js/Express per il protocollo Petra. Gestisce donazioni, certificati crittografici, integrazione Stripe, e anchoring su XRPL.

> **⚠️ Questo backend è in fase di sviluppo. Non è production-ready.**

## Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express
- **Database**: PostgreSQL via Prisma ORM
- **Pagamenti**: Stripe Connect
- **Ledger**: XRPL (XRP Ledger)
- **Validazione**: Zod
- **Logging**: Pino

## Setup

```bash
# Installa le dipendenze
npm install

# Genera il client Prisma
npx prisma generate

# Configura le variabili d'ambiente
cp .env.example .env
# Compila i valori in .env

# Esegui le migrazioni del database
npx prisma migrate dev

# Avvia il server in modalità sviluppo
npm run dev
```

## Variabili d'ambiente

| Variabile | Descrizione |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL |
| `XRPL_MASTER_SEED` | Seed dell'account XRPL per il broadcast delle transazioni |
| `STRIPE_SECRET_KEY` | Chiave segreta Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret per la validazione dei webhook Stripe |
| `SHADOW_DID_SALT` | Salt per la generazione degli shadow DID |
| `PORT` | Porta del server (default: 4000) |

## Struttura

```
backend/
├── prisma/
│   └── schema.prisma    # Schema del database
├── src/
│   └── index.ts         # Entry point Express
├── .env.example         # Template variabili d'ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## Schema Database

- **User** — utenti con shadow DID
- **Donation** — donazioni in centesimi (Int, mai Float) con leaf hash per Merkle tree
- **Batch** — lotti di donazioni con root hash e transazione XRPL
- **Project** — progetti di restauro con localizzazione

### Nota su `amount`

Il campo `amount` in `Donation` è di tipo `Int` e rappresenta centesimi. 5.00€ = 500. Questa scelta risolve il problema di determinismo nella serializzazione dei float per il calcolo del Merkle tree.
