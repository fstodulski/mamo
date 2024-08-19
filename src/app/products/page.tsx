import { ProductsListServer } from "@/app/products/_containers/products-list/root.server";
import { Suspense } from "react";

export default async function ProductsPage() {
  return (
    <>
      <main className="w-full bg-background py-20">
        <section className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsListServer />
          </Suspense>
        </section>
      </main>

      <script src="https://assets.mamopay.com/public/checkout-inline.min.js" />
    </>
  );
}
