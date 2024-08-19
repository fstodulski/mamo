import type { Expense } from "@/lib/models/expense.model";

import { create } from "zustand";
export type ExpensesListStore = {
  expenses: Expense[];
  totalElements: number;
  currentPage: number;
  hasMore: boolean;
  limit: number;
  isLoading: boolean;
  updateHasMore: (hasMore: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setExpenses: (expenses: Expense[]) => void;
  updateExpenses: (expenses: Expense[]) => void;
  updateCurrentPage: (page: number) => void;
  incrementCurrentPage: () => void;
};

export const useExpensesListStore = create<ExpensesListStore>((set) => ({
  expenses: [],
  totalElements: 0,
  currentPage: 1,
  limit: 20,
  isLoading: false,
  hasMore: true,
  updateHasMore: (hasMore: boolean) => set({ hasMore }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setExpenses: (expenses: Expense[]) => set({ expenses }),
  updateCurrentPage: (page: number) => set({ currentPage: page }),
  incrementCurrentPage: () =>
    set((state) => ({ currentPage: +state.currentPage + 1 })),
  updateExpenses: (expenses: Expense[]) =>
    set((state) => ({
      expenses: [...state.expenses, ...expenses],
    })),
}));
