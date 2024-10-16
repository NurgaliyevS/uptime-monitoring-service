import Monitor from "@/backend/monitor";
import connectMongoDB from "@/backend/mongodb";
import { createCronJob, deleteCronJob, updateCronJob } from "@/utils/cronJobManager";
import { isDevelopment } from "@/utils/isDevelopment";

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

        // get all monitors
        const monitors = await Monitor.find();
        return res.status(200).json({ success: true, data: monitors });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }

    case "POST":
      try {
        const monitor = await saveMonitor(req.body);
        const { _id } = monitor;
        if (!isDevelopment()) {
          const cronJobResult = await createCronJob(
            req.body.interval,
            req.body.url_or_ip,
            _id
          );

          if (cronJobResult) {
            await Monitor.findByIdAndUpdate(_id, { cronJobId: cronJobResult });
          } else {
            console.error("Failed to create cron job or get jobId");
          }
        }
        return res
          .status(201)
          .json({ success: true, data: "Added succesfully" });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    case "PUT":
      try {
        const { enabled, cronJobId, id, ...updateData } = req.body;
        console.log(req.body, "req.body");

        if (enabled && enabled === true) {
          await updateCronJob(cronJobId);
          await Monitor.findByIdAndUpdate(id, {
            $set: { enabled: true, status: "up", email_sent_count: 0 },
          });
          return res
            .status(200)
            .json({ success: true, data: "Monitor enabled" });
        }
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
          const monitor = await Monitor.findByIdAndDelete(id);
          if (!isDevelopment()) {
            await deleteCronJob(monitor.cronJobId);
          }
          if (!monitor) {
            return res
              .status(404)
              .json({ success: false, message: "Monitor not found" });
          }
          return res.status(200).json({ success: true, data: {} });
        } else if (ids) {
          const idsArray = ids.split(",");
          // Fetch monitors from the database
          const monitors = await Monitor.find({ _id: { $in: idsArray } });

          if (isDevelopment() === false) {
            for (const monitor of monitors) {
              console.log(monitor, "monitor");
              // Try to delete by stored cronJobId
              if (monitor.cronJobId) {
                await deleteCronJob(monitor.cronJobId);
              }
            }
          }

          // Delete monitors from the database
          await Monitor.deleteMany({ _id: { $in: idsArray } });
          return res.status(200).json({
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
