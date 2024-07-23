import axios from 'axios';

const API_BASE_URL = 'https://api.cron-job.org';
const API_KEY = process.env.CRON_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function createOrUpdateCronJob(monitorId, interval) {
  const jobUrl = `https://uptimefriend.com/api/cron/${monitorId}/check`;
  const jobName = `Monitor ${monitorId}`;

  console.log(interval, 'interval');
  console.log(monitorId, 'monitorid')

  try {
    // Check if the job already exists
    console.log(api.baseURL, 'base url');

    const existingJobs = await api.get('/jobs/' + monitorId);

    console.log(existingJobs, 'existingJobs');
    console.log(jobUrl, 'job url');
    
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
        }
      });
      console.log(`Updated cron job for monitor ${monitorId}`);
    } else {
      // Create new job
      await api.put('/jobs', {
        job: {
          url: jobUrl,
          title: jobName,
          schedule: `*/${interval} * * * *`,
          requestMethod: 1, // POST
          saveResponses: false,
          enabled: true,
        }
      });
      console.log(`Created cron job for monitor ${monitorId}`);
    }
  } catch (error) {
    console.error(`Error managing cron job for monitor ${monitorId}:`, error.response?.data || error.message);
  }
}

export async function deleteCronJob(monitorId) {
  const jobName = `Monitor ${monitorId}`;

  try {
    const existingJobs = await api.get('/jobs', { params: { search: jobName } });
    
    if (existingJobs.data.jobs.length > 0) {
      const jobId = existingJobs.data.jobs[0].jobId;
      await api.delete(`/jobs/${jobId}`);
      console.log(`Deleted cron job for monitor ${monitorId}`);
    }
  } catch (error) {
    console.error(`Error deleting cron job for monitor ${monitorId}:`, error.response?.data || error.message);
  }
}