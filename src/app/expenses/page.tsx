"use server";

import { ExpensesList } from "@/app/expenses/_container/expenses-list/root";
import { fetchExpensesAction } from "@/lib/actions/fetch-expenses.action";

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
      <ExpensesList data={expenses} />
    </div>
  );
}
