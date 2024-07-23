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

export async function createCronJob(interval, urlOrIp, monitorId){
    console.log(interval, "interval");
    console.log(urlOrIp, "urlOrIp");
    console.log(monitorId, "monitorId");
    console.log(interval / 60, "interval / 60");
    try {
        const response = await api.put("/jobs", {
        job: {
            url: `https://uptimefriend.com/api/cron/${monitorId}/check`,
            title: urlOrIp,
            requestMethod: 1, // POST
            saveResponses: false,
            enabled: true,
            schedule: `*/5 * * * *`
        },
        });
        console.log(`Created cron job for Uptime Friend`);
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
