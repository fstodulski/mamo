import type { Expense } from "@/lib/models/expense.model";

import { devtools } from "zustand/middleware";

import { create } from "zustand";

export type Pagination = {
  totalElements: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
};

export type ExpensesListStore = {
  expenses: Expense[];
  limit: number;
  isLoading: boolean;
  pagination: Pagination;
  updatePagination: (pagination: Partial<Pagination>) => void;
  setIsLoading: (isLoading: boolean) => void;
  setExpenses: (expenses: Expense[]) => void;
  updateExpenses: (expenses: Expense[]) => void;
};

export const useExpensesListStore = create<ExpensesListStore>()(
  devtools((set) => ({
    expenses: [],
    limit: 20,
    isLoading: false,
    pagination: {
      totalElements: 0,
      currentPage: 1,
      limit: 20,
      hasNextPage: true,
    },
    updatePagination: (pagination: Partial<Pagination>) =>
      set((state) => ({
        pagination: { ...state.pagination, ...pagination },
      })),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setExpenses: (expenses: Expense[]) => set({ expenses }),
    updateExpenses: (expenses: Expense[]) =>
      set((state) => ({
        expenses: [...state.expenses, ...expenses],
      })),
  })),
);
