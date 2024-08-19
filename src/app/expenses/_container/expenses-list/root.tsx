"use client";

import { useExpensesListStore } from "@/app/expenses/_container/expenses-list/store";
import { fetchExpensesAction } from "@/lib/actions/fetch-expenses.action";
import type { Expense } from "@/lib/models/expense.model";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
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
export const ExpensesList = ({ data }: ExpensesListProps) => {
  const router = useRouter();

  const {
    isLoading,
    limit,
    hasMore,
    setIsLoading,
    updateExpenses,
    currentPage,
    updateCurrentPage,
    incrementCurrentPage,
    updateHasMore,
    expenses: expensesStore,
  } = useExpensesListStore();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const isEmpty = useMemo(() => expensesStore.length === 0, [expensesStore]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    if (!data.pagination.hasNextPage) {
      updateHasMore(false);
      toast.info("No more data");
      return;
    }

    const expenses = await fetchExpensesAction(currentPage);

    if (expenses.expenses.length > 0) {
      updateExpenses([...expensesStore, ...expenses.expenses]);

      updateHasMore(expenses.pagination.hasNextPage);
      router.push(`/expenses?page=${+currentPage}&limit=${limit}`);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    updateExpenses(data.expenses);
    updateCurrentPage(+data.pagination.currentPage);
  }, []);

  useEffect(() => {
    if (inView) {
      incrementCurrentPage();
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
          expensesStore.map((expense) => (
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

        {!isEmpty && hasMore && <span ref={ref}>Load More</span>}
      </div>
    </div>
  );
};
