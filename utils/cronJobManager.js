import axios from "axios";

const API_BASE_URL = "https://api.cron-job.org";
const API_KEY = process.env.CRON_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function createCronJob(interval, urlOrIp, monitorId) {
  let schedule;

  // Convert interval from seconds to minutes
  const intervalMinutes = interval / 60;

  switch (intervalMinutes) {
    case 1:
      schedule = { minutes: [-1] }; // Every 1 minute
      break;
    case 3:
      schedule = {
        minutes: [
          0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51,
          54, 57,
        ],
      }; // Every 3 minutes
      break;
    case 5:
      schedule = { minutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] }; // Every 5 minutes
      break;
    default:
      throw new Error(`Unsupported interval: ${intervalMinutes} minutes`);
  }

  try {
    const response = await api.put("/jobs", {
      job: {
        title: urlOrIp,
        url: `https://uptimefriend.com/api/cron/${monitorId}/check`,
        requestMethod: 1,
        enabled: "true",
        saveResponses: true,
        schedule: {
          timezone: "Europe/Berlin",
          expiresAt: 0,
          hours: [-1],
          mdays: [-1],
          months: [-1],
          wdays: [-1],
          ...schedule,
        },
      },
    });

    console.log(
      `Created cron job for Uptime Friend with ${intervalMinutes}-minute interval`
    );
    return response?.data;
  } catch (error) {
    console.error(
      `Error creating cron job for Uptime Friend:`,
      error.response?.data || error.message
    );
  }
}

export async function updateCronJob(monitorId, interval) {
  const jobUrl = `https://uptimefriend.com/api/cron/${monitorId}/check`;
  const jobName = `Monitor ${monitorId}`;

  console.log(interval, "interval");
  console.log(monitorId, "monitorid");

  try {
    const existingJobs = await api.get("/jobs/" + monitorId);

    console.log(existingJobs, "existingJobs");
    console.log(jobUrl, "job url");

    if (existingJobs.data.jobs.length > 0) {
      // Update existing job
      const jobId = existingJobs.data.jobs[0].jobId;
      await api.patch(`/jobs/${jobId}`, {
        job: {
          url: jobUrl,
          schedule: `*/${interval} * * * *`,
          requestMethod: 1, // POST
          saveResponses: false,
          enabled: true,
        },
      });
      console.log(`Updated cron job for monitor ${monitorId}`);
    }
  } catch (error) {
    console.error(
      `Error managing cron job for monitor ${monitorId}:`,
      error.response?.data || error.message
    );
  }
}

export async function deleteCronJob(monitorId) {
  const jobName = `Monitor ${monitorId}`;

  try {
    const existingJobs = await api.get("/jobs", {
      params: { search: jobName },
    });

    if (existingJobs.data.jobs.length > 0) {
      const jobId = existingJobs.data.jobs[0].jobId;
      await api.delete(`/jobs/${jobId}`);
      console.log(`Deleted cron job for monitor ${monitorId}`);
    }
  } catch (error) {
    console.error(
      `Error deleting cron job for monitor ${monitorId}:`,
      error.response?.data || error.message
    );
  }
}
