"use server";

import { ExpensesList } from "@/app/expenses/_container/expenses-list/root";
import { fetchExpensesAction } from "@/lib/actions/fetch-expenses.action";
import { Suspense } from "react";

export type ExpensesProps = {
  searchParams: {
    page: number;
  };
};
export default async function Expenses({ searchParams }: ExpensesProps) {
  const { page = 1 } = searchParams;

  const expenses = await fetchExpensesAction(page);

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <ExpensesList data={expenses} />
      </Suspense>
    </div>
  );
}
