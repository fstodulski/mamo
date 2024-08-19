import type { PaginatedRequest } from "@/lib/models/paginated-request.model";
import { expensesSchema } from "@/lib/schemas/expense.schema";
import { Service } from "@/lib/services/(shared)/service";

export class ExpensesService extends Service {
  public async getExpenses({ page = 1, limit = 10 }: PaginatedRequest) {
    const response = await fetch(
      `https://mamo-mock-server.glitch.me/expenses?limit=${limit}&page=${page}`,
    );

    if (response.status !== 200) {
      this._handleError("Failed to fetch expenses");
    }

    const data = await response.json();
    const validData = expensesSchema.safeParse(data.expenses);

    if (!validData.success) {
      this._handleError("Failed to parse expenses");
    }

    return this._handleResponse({
      data: validData.data,
      pagination: data.pagination,
    });
  }
}
