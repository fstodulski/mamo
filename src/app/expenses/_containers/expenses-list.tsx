"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchExpences } from "@/lib/actions/fetch-expences";
import type { Expenses } from "@/lib/schemas/expense.schema";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export type ExpensesListProps = {
  data: {
    expenses: Expenses;
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
};
export const ExpensesList = ({ data }: ExpensesListProps) => {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [expenses, setExpenses] = useState<Expenses>(data.expenses);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMorePosts = async () => {
    const apiPosts = await fetchExpences(page, 30);

    console.log("API Posts ->", apiPosts);
    setExpenses((prevPosts) => [...prevPosts, ...apiPosts.expenses]);
    setPage((prevOffset) => prevOffset + 1);
  };

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    <>
      <section className="h-[400px] overflow-y-scroll">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Expence Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={`${expense.id}-${expense.date}`}>
                <TableCell className="font-medium">{expense.date}</TableCell>
                <TableCell>{expense.status}</TableCell>
                <TableCell>{expense.paymentMethod}</TableCell>
                <TableCell className="text-right">{expense.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button ref={ref} className="w-full">
          Loading more...
        </Button>
      </section>
    </>
  );
};
