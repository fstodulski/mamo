"use client";

import { useExpensesListStore } from "@/app/expenses/_container/expenses-list/store";
import { fetchExpensesAction } from "@/lib/actions/fetch-expenses.action";
import type { Expense } from "@/lib/models/expense.model";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { memo, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

export type ExpensesListProps = {
  data: {
    expenses: Expense[];
    pagination: {
      totalElements: number;
      currentPage: number;
      limit: number;
      hasNextPage: boolean;
    };
  };
};
export const ExpensesList = memo(({ data }: ExpensesListProps) => {
  const router = useRouter();

  const {
    isLoading,
    pagination,
    limit,
    setIsLoading,
    updatePagination,
    updateExpenses,
    expenses,
  } = useExpensesListStore();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const isEmpty = useMemo(() => expenses.length === 0, [expenses]);

  const handleLoadMore = async () => {
    setIsLoading(true);

    const result = await fetchExpensesAction(pagination.currentPage);

    if (!result.pagination.hasNextPage) {
      updatePagination({
        hasNextPage: false,
        currentPage: +result.pagination.currentPage,
      });

      setIsLoading(false);
      toast.info("No more data");

      return;
    }

    if (result.expenses.length > 0) {
      const newArray = [...expenses, ...result.expenses];
      updateExpenses(newArray);
      updatePagination({
        hasNextPage: result.pagination.hasNextPage,
        currentPage: +result.pagination.currentPage + 1,
      });

      router.push(`/expenses?page=${+pagination.currentPage}&limit=${limit}`);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updateExpenses(data.expenses);

    updatePagination({
      totalElements: data.pagination.totalElements,
      currentPage: +data.pagination.currentPage,
      limit: limit,
      hasNextPage: data.pagination.hasNextPage,
    });

    return () => {
      updateExpenses([]);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

  return (
    <div className=" w-full pt-20">
      <h1 className="font-bold text-2xl">Expenses</h1>
      <div
        className={cn("grid max-h-[320px] grid-cols-1 overflow-y-auto", {
          "opacity-50": isLoading,
        })}
      >
        {!isEmpty &&
          expenses.map((expense) => (
            <>
              <div
                key={`${expense.id}`}
                className="grid grid-cols-4 border-border border-gray-200 border-b p-4 last-of-type:border-none"
              >
                <p className="text-gray-500 text-sm">{expense.date}</p>
                <p className="text-gray-500 text-sm">{expense.category}</p>
                <p className="text-gray-500 text-sm">{expense.description}</p>
                <p className="text-gray-500 text-sm">
                  {expense.amount} {expense.currency}
                </p>
              </div>
            </>
          ))}

        {!isEmpty && pagination.hasNextPage && (
          <span ref={ref} className="text-center text-xs">
            Load More...
          </span>
        )}
      </div>
    </div>
  );
});

ExpensesList.displayName = "ExpensesList";
