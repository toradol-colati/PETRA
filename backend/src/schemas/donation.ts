import { z } from "zod";

export const createDonationSchema = z.object({
  amount: z
    .number()
    .int("Amount must be an integer (centesimi)")
    .min(350, "Minimum donation is 350 centesimi (€3.50)")
    .max(100000, "Maximum donation is 100000 centesimi (€1000)"),
  currency: z.enum(["EUR"]).default("EUR"),
  locationId: z.string().uuid("Invalid project ID"),
  email: z.string().email("Invalid email address"),
});

export type CreateDonationInput = z.infer<typeof createDonationSchema>;
