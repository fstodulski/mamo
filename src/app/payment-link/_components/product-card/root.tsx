import { useCartStore } from "@/app/payment-link/_containers/cart/store";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/models/product.model";

export type ProductCardProps = {
  data: Product;
};

export const ProductCard = ({ data }: ProductCardProps) => {
  const { add } = useCartStore();

  const handleAddToCart = () => {
    add(data);
  };

  return (
    <div className="group block overflow-hidden">
      <div className="relative h-[350px] sm:h-[450px]">
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
        />

        <img
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="relative bg-white pt-3">
        <h3 className="text-gray-700 text-sm group-hover:underline group-hover:underline-offset-4">
          {data.title}
        </h3>

        <div className="mt-1.5 flex items-center justify-between text-gray-900">
          <p className="tracking-wide">${data.price}</p>

          <p className="text-xs uppercase tracking-wide">6 Colors</p>
        </div>
        <Button size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
