"use client";

import axios from "axios";

export async function buyProduct(variantId) {
  try {
    const payload = {
      productId: "310762",
    };

    if (typeof variantId === 'string') {
      payload.variantId = variantId;
    }

    const response = await axios.post("/api/purchaseProduct/product", payload);

    const url = response.data?.data;

    if (url) {
      // Attempt to open in new tab
      const newTab = window.open(url, "_blank");
      if (!newTab || newTab.closed || typeof newTab.closed == 'undefined') {
        // Fallback if pop-up blocker blocks the new tab
        window.location.href = url;
      }
    }
  } catch (error) {
    console.error(error);
    // notify that could not buy a product
  }
}
