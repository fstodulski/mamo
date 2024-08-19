"use server";

export const fetchExpensesAction = async (page: number) => {
  const response = await fetch(
    `https://mamo-mock-server.glitch.me/expenses?page=${page}&limit=20`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
