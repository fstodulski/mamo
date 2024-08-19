"use server";

import { buyProductSchema } from "@/app/products/_containers/products-list/schema";
import { actionClient } from "@/lib/actions/(schared)/safe-action";
import { MamoService } from "@/lib/services/mamo/mamo.service";

export const safeBuyProductAction = actionClient
  .metadata({
    actionName: "safeBuyProductAction",
  })
  .schema(buyProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    console.log("Parsed input ->", parsedInput);
    const response = await new MamoService().createProductPaymentLink(
      parsedInput,
    );

    console.log("Response ->", response);
    return response;
  });
