import { z } from "zod";

export const buyProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  email: z.string(),
});

export type BuyProduct = z.infer<typeof buyProductSchema>;
