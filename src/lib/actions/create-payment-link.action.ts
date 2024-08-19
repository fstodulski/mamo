"use server";

export type CreatePaymentlinkPayload = {
  id: string;
  product: {
    title: string;
    description: string;
    price: number;
  };
  email: string;
  firstName: string;
  lastName: string;
};
export const createPaymentLinkAction = async (
  data: CreatePaymentlinkPayload,
) => {
  const apiKey = process.env.MAMO_PRIVATE_SDK_KEY;

  if (!apiKey) {
    throw new Error("No API key found");
  }

  try {
    const response = await fetch(
      "https://sandbox.dev.business.mamopay.com/manage_api/v1/links",
      {
        method: "POST",
        body: JSON.stringify({
          title: data.product.title,
          link_type: "inline",
          description: data.product.description,
          amount: data.product.price,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
        }),
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const responseData = await response.json();

    if (!responseData) {
      throw new Error("Something went wrong");
    }

    return responseData;
  } catch (error) {
    console.error(error);
  }
};
