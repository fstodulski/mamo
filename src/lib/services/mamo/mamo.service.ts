import type { BuyProduct } from "@/app/products/_containers/products-list/schema";
import { envServer } from "@/env.server";
import { Service } from "@/lib/services/(shared)/service";
import mamopay from "@api/mamopay";

export class MamoService extends Service {
  /**
   *
   */
  public async createProductPaymentLink(data: BuyProduct) {
    console.log(`Bearer ${envServer.MAMO_PRIVATE_SDK_KEY}`);
    const response = await mamopay
      .auth(`Bearer ${envServer.MAMO_PRIVATE_SDK_KEY}`)
      .postLinks({
        title: data.title,
        description: data.description,
        amount: data.price,
        link_type: "inline",
        email: data.email,
      });

    if (response.status !== 200) {
      console.log(response.data);
    }

    if (response.status !== 200) {
      this._handleError("Failed to create payment link");
    }

    return this._handleResponse(response.data);
  }
}
