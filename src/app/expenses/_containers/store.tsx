import type { Expenses } from "@/lib/schemas/expense.schema";
import { create } from "zustand";

export type ExpensesStore = {
  expenses: Expenses;
  setExpenses: (expenses: Expenses) => void;
  addExpense: (expense: Expenses) => void;
};

export const useExpensesStore = create<ExpensesStore>((set) => ({
  expenses: [],
  setExpenses: (expenses: Expenses) => set({ expenses }),
  addExpense: (expenses: Expenses) =>
    set((state) => ({ expenses: [...state.expenses, ...expenses] })),
}));
