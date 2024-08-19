"use server";

export const fetchExpences = async (page: number, limit: number) => {
  try {
    const url = `https://mamo-mock-server.glitch.me/expenses?limit=${limit}&page=${page}`;
    const response = await fetch(url);

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
