import Monitor from "@/backend/monitor";
import axios from "axios";
import { sendEmail } from "./mailgun";
import User from "@/backend/user";

export async function checkMonitor(monitor) {
  try {
    const startTime = Date.now();
    let response;

    console.log(monitor, "check monitor");

    if (monitor.monitor_type === "http") {
      response = await axios.get(monitor.url_or_ip, {
        timeout: monitor.interval,
      });
    } else if (monitor.monitor_type === "ping") {
      response = await axios.get(`http://${monitor.url_or_ip}`, {
        timeout: monitor.interval,
      });
    }

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    await Monitor.findByIdAndUpdate(monitor._id, {
      $set: { status: "up", lastChecked: new Date() },
      $inc: { successfulChecks: 1 },
    });

    console.log(
      `Monitor ${monitor._id} is up. Response time: ${responseTime}ms`
    );
  } catch (error) {
    console.error(`Error checking monitor ${monitor._id}:`, error.message);

    const newIncident = {
      status: "down",
      rootCause: error.message,
      started: new Date(),
      duration: 0,
    };

    const user = await User.findOne({ email: monitor.user_email });

    let emailLimit;
    if (user?.variant_name) {
      switch (user.variant_name.toLowerCase()) {
        case "personal":
          emailLimit = 100;
          break;
        case "team":
          emailLimit = 200;
          break;
        case "enterprise":
          emailLimit = 500;
          break;
        default:
          emailLimit = 0; // Default to personal limit if variant is unknown
      }

      if (monitor.email_sent_count > emailLimit) {
        if (monitor.status === "down") {
          const accidentIncident = {
            status: "email_limit_exceeded",
            rootCause: "Email limit exceeded",
            started: new Date(),
            duration: 0,
          };

          await Monitor.findByIdAndUpdate(monitor._id, {
            $set: {
              status: "email_limit_exceeded",
              lastChecked: new Date(),
              latest_incident: accidentIncident,
            },
            $inc: { incidents24h: 1, failedChecks: 1 },
          });

          // enabled = false;

          const response = await api.put("/jobs/" + monitor._id, {
            job: {
              url: `https://uptimefriend.com/api/cron/${monitor._id}/check`,
              enabled: false,
            },
          });
          
          console.log(response, 'response');

          for (let email of monitor.notification_emails) {
            await sendEmail({
              to: email,
              subject: `Email limit exceeded`,
              text: `You have exceeded the email limit for your plan. 
              Please upgrade to a higher plan to continue receiving notifications.`,
              html: `
                <div>
                  <p>You have exceeded the email limit for your plan. </p>
                  <p>Please upgrade to a higher plan to continue receiving notifications.</p>
                </div>
              `,
            });
          }

          return;
        }
        return;
      }
    }

    // Reset email_sent_count on first day each month
    if (new Date().getDate() === 1) {
      await Monitor.findByIdAndUpdate(monitor._id, {
        $set: { email_sent_count: 0 },
      });
    }

    let counter = 0;
    for (let email of monitor.notification_emails) {
      console.error(email, "email");

      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      });

      await sendEmail({
        to: email,
        subject: `${monitor.url_or_ip} is down`,
        text: `
          Monitor: ${monitor.name || monitor._id}
          URL/IP: ${monitor.url_or_ip}
          Status: DOWN
          Error: ${error.message}
          Date: ${formattedDate}
          Time: ${formattedTime}
        `,
        html: `
          <div>
            <p><b>Monitor:</b> ${monitor.name || monitor._id}</p>
            <p><b>URL/IP:</b> ${monitor.url_or_ip}</p>
            <p><b>Status:</b> DOWN</p>
            <p><b>Error:</b> ${error.message}</p>
            <p><b>Date:</b> ${formattedDate}</p>
            <p><b>Time:</b> ${formattedTime}</p>
          </div>
        `,
      });
      counter++;
    }

    if (monitor.latest_incident.status !== "email_limit_exceeded") {
      await Monitor.findByIdAndUpdate(monitor._id, {
        $set: {
          status: "down",
          lastChecked: new Date(),
          latest_incident: newIncident,
        },
        $inc: { incidents24h: 1, failedChecks: 1, email_sent_count: counter },
      });
    }
  }
}

export async function checkAllMonitors() {
  const monitors = await Monitor.find({});
  for (const monitor of monitors) {
    await checkMonitor(monitor);
  }
}
