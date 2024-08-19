import { productSchema } from "@/lib/schemas/product.schema";
import { z } from "zod";

export const productsListSchema = z.array(productSchema);

export type ProductsList = z.infer<typeof productsListSchema>;
