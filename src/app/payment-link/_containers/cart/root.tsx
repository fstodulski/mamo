"use client";

import { useCartStore } from "@/app/payment-link/_containers/cart/store";
import { Button } from "@/components/ui/button";
import { createPaymentLinkAction } from "@/lib/actions/create-payment-link.action";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const Cart = () => {
  const { products, remove, clean } = useCartStore();
  const router = useRouter();

  const totalPrice = useMemo(
    () => products.reduce((acc, product) => acc + product.price, 0),
    [products],
  );
  const handleClick = async () => {
    const response = await createPaymentLinkAction({
      id: "1",
      product: {
        title: "Test",
        description: "Test",
        price: totalPrice,
      },
      email: "test@test.com",
      firstName: "Test",
      lastName: "Test",
    });

    router.push(response.payment_url);
  };

  return (
    <div className="flex w-full flex-col gap-2 pt-10 pl-5">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex w-full flex-col gap-2 border border-border p-2"
        >
          <p className="text-gray-500 text-sm">{product.title}</p>
          <p className="text-gray-500 text-sm">{product.description}</p>
          <p className="text-gray-500 text-sm">{product.price}</p>

          <Button onClick={() => remove(product)}>Remove</Button>
        </div>
      ))}
      <Button onClick={handleClick}>Create Payment Link</Button>
    </div>
  );
};
