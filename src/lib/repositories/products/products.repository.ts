type PaginatedRequest = {
  limit: number;
  skip: number;
};

export class ProductsRepository {
  private readonly _baseUrl: string;

  constructor() {
    this._baseUrl = "https://dummyjson.com/products";
  }

  public async list(request: PaginatedRequest) {
    const response = await fetch(
      `${this._baseUrl}?limit=${request.limit}&skip=${request.skip}`,
    );

    // Handle errors
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data;
  }
}
