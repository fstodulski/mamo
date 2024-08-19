"use server";

import { ProductCard } from "@/app/products/_containers/products-list/product-card";
import { ProductsRepository } from "@/lib/repositories/products/products.repository";

export const ProductsListServer = async () => {
  const { products, limit, skip } = await new ProductsRepository().list({
    limit: 9,
    skip: 0,
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {products.map((product) => (
        <div key={product.id} className="col-span-1">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
