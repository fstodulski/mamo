import { ExpensesList } from "@/app/expenses/_containers/expenses-list";
import { fetchExpences } from "@/lib/actions/fetch-expences";

export type ExpensesPageProps = {
  searchParams: {
    page: number;
    limit: number;
  };
};
export default async function ExpensesPage({
  searchParams,
}: ExpensesPageProps) {
  const { page = 1, limit = 30 } = searchParams;

  const expenses = await fetchExpences(page, limit);

  return (
    <main className="container">
      <ExpensesList data={expenses} />
    </main>
  );
}
