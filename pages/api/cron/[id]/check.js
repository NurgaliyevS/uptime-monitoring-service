import connectMongoDB from "@/backend/mongodb";
import Monitor from "@/backend/monitor";
import { checkMonitor } from "@/utils/monitoringService";

export default async function handler(req, res) {
  await connectMongoDB();
  if (req.method === "POST") {
    const { id } = req.query;

    try {
      const monitor = await Monitor.findById(id);
      console.log(monitor, "monitor check in cron by id");
      if (!monitor) {
        return res
          .status(404)
          .json({ success: false, message: "Monitor not found" });
      }

      await checkMonitor(monitor);
      res.status(200).json({ success: true, message: "Check completed" });
    } catch (error) {
      console.error(`Error checking monitor ${id}:`, error);
      res
        .status(500)
        .json({ success: false, message: "Error checking monitor" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
