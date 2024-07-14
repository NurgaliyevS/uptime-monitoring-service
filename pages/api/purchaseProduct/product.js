import { lemonSqueezyApiInstance } from "@/utils/axios";
import { isDevelopment } from "@/utils/isDevelopment";

export default async function handler(req, res) {

  try {
    const request = await req.body;

    if (!request.productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: request?.userId || "123",
              email: request?.email || "123",
            },
            discount_code: isDevelopment() ? "C4MJAXOQ" : "AXMTYZNA"
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQEEZY_STORE_ID.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: request?.variantId || isDevelopment() ? "449882" : process.env.LEMON_SQEEZY_VARIANT_PERSONAL.toString(),
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Checkout created successfully",
      data: response.data?.data?.attributes.url,
    });
  } catch (error) {
    console.log("Error response:", error?.response?.data);
    console.log("Error message:", error?.message);
    return res
      .status(500)
      .json({ success: false, message: "An error occured" });
  }
}
