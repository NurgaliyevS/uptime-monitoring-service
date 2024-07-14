import connectMongoDB from "@/backend/mongodb";
import User from "@/backend/user";
import crypto from "crypto";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false, // We need the raw body for signature verification
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const buf = await buffer(req);
      const rawBody = buf.toString();

      // Verify the signature
      const secret = process.env.LEMON_SQEEZY_WEBHOOK_SIGNATURE;
      const hmac = crypto.createHmac("sha256", secret);
      const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
      const signature = Buffer.from(req.headers["x-signature"] || "", "utf8");

      if (!crypto.timingSafeEqual(digest, signature)) {
        throw new Error("Invalid signature.");
      }

      // Parse the body
      const body = JSON.parse(rawBody);
      const eventType = req.headers["x-event-name"];

      console.log(eventType, "eventType");

      await connectMongoDB();

      // Handle subscription events
      switch (eventType) {
        case "subscription_created":
        case "subscription_updated":
        case "subscription_resumed":
          await handleActiveSubscription(body);
          break;
        case "subscription_expired":
          await handleInactiveSubscription(body);
          break;
        default:
          console.log(`Unhandled event type: ${eventType}`);
      }

      res.status(200).json({ message: "Webhook received" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

async function handleActiveSubscription(body) {
  const {
    status,
    user_email,
    user_name,
    variant_name,
    urls: { customer_portal },
    renews_at,
    ends_at
  } = body.data.attributes;

  console.log(customer_portal, "customer_portal");
  console.log(renews_at, "renews_at");
  console.log(variant_name, "variant_name");
  console.log(status, 'status');
  console.log(ends_at, 'ends_at');

  const user = await User.findOne({ email: user_email });

  if (status === "cancelled") {
    user.user_status = status;
    user.variant_name = "free";
    user.subscription_renews_at = null;
    user.ends_at = ends_at;
    await user.save();
    return;
  }

  if (user) {
    user.user_status = status;
    user.variant_name = variant_name;
    user.customer_portal_url = customer_portal;
    user.subscription_renews_at = renews_at;
    user.ends_at = ends_at;
    await user.save();
  } else {
    const newUser = new User({
      user_status: status,
      variant_name: variant_name,
      name: user_name,
      email: user_email,
      customer_portal_url: customer_portal,
      subscription_renews_at: renews_at,
      ends_at: ends_at
    });
    await newUser.save();
  }
}

async function handleInactiveSubscription(body) {
  const { user_email, status, handleInactiveSubscription } = body.data.attributes;

  const user = await User.findOne({ email: user_email });

  if (user) {
    user.user_status = status;
    user.variant_name = "free";
    user.subscription_renews_at = null;
    user.ends_at = handleInactiveSubscription;
    await user.save();
  } else {
    console.log(`User not found for email: ${user_email}`);
  }
}
