"use client";

import { safeBuyProductAction } from "@/app/products/_containers/products-list/actions";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/schemas/product.schema";
import { useAction } from "next-safe-action/hooks";

export type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { execute } = useAction(safeBuyProductAction);

  const handleSubmit = () => {
    execute({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      email: "test@test.com",
    });
  };

  return (
    <div className="group relative block">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
        />

        <img
          src="https://images.unsplash.com/photo-1593795899630-b6033c0fa58d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
        <h3 className="font-medium text-white text-xl">{product.title}</h3>

        <p className="mt-1.5 text-pretty text-white text-xs">
          {product.description}
        </p>

        <Button onClick={handleSubmit} type="button" className="mt-4">
          Shop Now
        </Button>
      </div>
    </div>
  );
};
