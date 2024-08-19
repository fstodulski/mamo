"use client";

import { ProductCard } from "@/app/payment-link/_components/product-card/root";
import { Cart } from "@/app/payment-link/_containers/cart/root";
import { PRODUCTS } from "@/lib/constants/products.const";

export default async function PaymentLink() {
  return (
    <div className="container grid w-full grid-cols-3">
      <div className="col-span-2 grid w-full grid-cols-2 gap-4 py-10 pr-5">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
}
