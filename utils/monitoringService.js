import Monitor from '@/backend/monitor';
import axios from 'axios';

export async function checkMonitor(monitor) {
  try {
    const startTime = Date.now();
    let response;

    console.log(monitor, 'monitor')

    if (monitor.monitor_type === 'http') {
      response = await axios.get(monitor.url_or_ip, { timeout: monitor.interval });
    } else if (monitor.monitor_type === 'ping') {
      response = await axios.get(`http://${monitor.url_or_ip}`, { timeout: monitor.interval });
    }

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    await Monitor.findByIdAndUpdate(monitor._id, {
      $set: { status: 'up', lastChecked: new Date() },
      $inc: { successfulChecks: 1 }
    });

    console.log(`Monitor ${monitor._id} is up. Response time: ${responseTime}ms`);
  } catch (error) {
    console.error(`Error checking monitor ${monitor._id}:`, error.message);

    const newIncident = {
      status: 'down',
      rootCause: error.message,
      started: new Date(),
      duration: 0
    };

    await Monitor.findByIdAndUpdate(monitor._id, {
      $set: { 
        status: 'down', 
        lastChecked: new Date(),
        latest_incident: newIncident
      },
      $inc: { incidents24h: 1, failedChecks: 1 }
    });

    // TODO: Implement notification logic here (email, SMS)
  }
}

export async function checkAllMonitors() {
  const monitors = await Monitor.find({});
  for (const monitor of monitors) {
    await checkMonitor(monitor);
  }
}