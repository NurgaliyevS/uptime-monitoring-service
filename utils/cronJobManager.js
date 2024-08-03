import axios from "axios";

const API_BASE_URL = "https://api.cron-job.org";
const API_KEY = process.env.CRON_API_KEY;

export const api = axios.create({
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
  
  console.log(intervalMinutes, "intervalMinutes");

  switch (intervalMinutes) {
    case 1:
      schedule = { minutes: [-1] }; // Every 1 minute
      break;
    case 2:
        schedule = { minutes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 
        20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
        48, 50, 52, 54, 56, 58
        ] }; // Every 2 minutes
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
    return response?.data?.jobId;
  } catch (error) {
    console.error(
      `Error creating cron job for Uptime Friend:`,
      error.response?.data || error.message
    );
  }
}

export async function updateCronJob(monitorId, interval, cronJobId) {
  const jobUrl = `https://uptimefriend.com/api/cron/${monitorId}/check`;

  console.log(interval, "interval");
  console.log(monitorId, "monitorid");
  console.log(cronJobId, "cronJobId");

  try {
    const existingJobs = await api.get("/jobs/" + monitorId);

    console.log(existingJobs, "existingJobs");

    if (Object.keys(existingJobs?.data).length === 0) {
      // Update existing job
      const jobId = existingJobs.data?.jobDetails?.jobId
      console.log(jobId, "jobId");
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

export async function deleteCronJob(jobId) {
  try {
    const response = await api.delete(`/jobs/${jobId}`);
    return response?.data;
  } catch (error) {
    console.error(
      `Error deleting cron job for monitor ${monitorId}:`,
      error.response?.data || error.message
    );
  }
}
