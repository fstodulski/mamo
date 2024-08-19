import { z } from "zod";

export const expenseSchema = z.object({
  id: z.string(),
  date: z.string(),
  category: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  paymentMethod: z.string(),
  status: z.string(),
  receiptAttached: z.boolean(),
});

export const expensesSchema = z.array(expenseSchema);

// Types
export type Expense = z.infer<typeof expenseSchema>;
export type Expenses = z.infer<typeof expensesSchema>;
