import customConfig from "../project.custom.config.js";
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "dummy",
});

if (!process.env.MAILGUN_API_KEY) {
  console.log("⚠️ MAILGUN_API_KEY missing from .env")
}

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}) => {
  console.log(`Attempting to send email to ${to} with subject: ${subject}`);
  
  const data = {
    from: customConfig.mailgun.fromAdmin,
    to: [to],
    subject,
    text,
    html,
    ...(replyTo && { "h:Reply-To": replyTo }),
  };

  try {
    const domain = (customConfig.mailgun.subdomain ? `${customConfig.mailgun.subdomain}.` : "") + customConfig.domainName;
    console.log(`Sending email via Mailgun to domain: ${domain}`);
    
    const result = await mg.messages.create(domain, data);
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};