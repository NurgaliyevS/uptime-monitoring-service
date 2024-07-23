import Monitor from "@/backend/monitor";
import connectMongoDB from "@/backend/mongodb";
import { createCronJob, deleteCronJob } from "@/utils/cronJobManager";

async function saveMonitor(monitorData) {
  const monitor = new Monitor(monitorData);
  await monitor.save();
  return monitor;
}

async function updateMonitor(id, updateData) {
  const updatedMonitor = await Monitor.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedMonitor;
}

async function getMonitorById(id) {
  const monitor = await Monitor.findById(id);
  return monitor;
}

async function getMonitorsByUserEmail(userEmail) {
  const monitors = await Monitor.find({ user_email: userEmail });
  return monitors;
}

async function updateIncident(id, incidentData) {
  const updatedMonitor = await Monitor.findByIdAndUpdate(
    id,
    {
      latestIncident: incidentData,
      $inc: { incidents24h: 1 },
    },
    { new: true }
  );
  return updatedMonitor;
}

async function resetIncidents24h() {
  await Monitor.updateMany({}, { incidents24h: 0 });
}

// API Handler
export default async function handler(req, res) {
  const { method } = req;

  await connectMongoDB();

  switch (method) {
    case "GET":
      try {
        const { id, email } = req.query;

        if (id) {
          const monitor = await getMonitorById(id);
          if (!monitor) {
            return res
              .status(404)
              .json({ success: false, message: "Monitor not found" });
          }
          return res.status(200).json({ success: true, data: monitor });
        }

        if (email) {
          const monitors = await getMonitorsByUserEmail(email);
          return res.status(200).json({ success: true, data: monitors });
        }

        return res
          .status(400)
          .json({ success: false, message: "Missing id or email parameter" });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    case "POST":
      try {
        const monitor = await saveMonitor(req.body);
        const { _id } = monitor;
        console.log(_id, "monitor id");
        const response = await createCronJob(interval, url_or_ip, _id);
        console.log(response, "response");
        // const { jobId } = response;
        // await Monitor.findByIdAndUpdate(_id, { cronJobId: jobId });
        return res.status(201).json({ success: true, data: monitor });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case "PUT":
      try {
        const { id, ...updateData } = req.body;
        const updatedMonitor = await updateMonitor(id, updateData);
        if (!updatedMonitor) {
          return res
            .status(404)
            .json({ success: false, message: "Monitor not found" });
        }
        return res.status(200).json({ success: true, data: updatedMonitor });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    case "PATCH":
      try {
        const { id, incidentData } = req.body;
        const updatedMonitor = await updateIncident(id, incidentData);
        if (!updatedMonitor) {
          return res
            .status(404)
            .json({ success: false, message: "Monitor not found" });
        }
        return res.status(200).json({ success: true, data: updatedMonitor });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    case "DELETE":
      try {
        const { id, ids } = req.query;

        if (id) {
          // Delete single monitor
          await deleteCronJob(id);
          const monitor = await Monitor.findByIdAndDelete(id);
          if (!monitor) {
            return res
              .status(404)
              .json({ success: false, message: "Monitor not found" });
          }
          return res.status(200).json({ success: true, data: {} });
        } else if (ids) {
          // Delete multiple monitors
          const idsArray = ids.split(",");
          // call deleteCronJob for each id
          for (const id of idsArray) {
            await deleteCronJob(id);
          }
          const result = await Monitor.deleteMany({ _id: { $in: idsArray } });
          if (result.deletedCount === 0) {
            return res
              .status(404)
              .json({ success: false, message: "No monitors found" });
          }
          return res
            .status(200)
            .json({
              success: true,
              data: { deletedCount: result.deletedCount },
            });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Missing id or ids parameter" });
        }
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH"]);
      return res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
  }
}

// Export actions for use in other parts of your application if needed
export {
  saveMonitor,
  updateMonitor,
  getMonitorById,
  getMonitorsByUserEmail,
  updateIncident,
  resetIncidents24h,
};
