import { checkAllMonitors } from "../../utils/monitoringService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Optional: Add some basic authentication
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.CRON_API_KEY) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
      await checkAllMonitors();
      res.status(200).json({ success: true, message: "Checks completed" });
    } catch (error) {
      console.error("Error running checks:", error);
      res.status(500).json({ success: false, message: "Error running checks" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
