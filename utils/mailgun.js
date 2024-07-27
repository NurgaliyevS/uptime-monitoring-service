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
}
// : {
//   to: string;
//   subject: string;
//   text?: string;
//   html?: string;
//   replyTo?: string;
// }
) => {
  const data = {
    from: customConfig.mailgun.fromAdmin,
    to: [to],
    subject,
    text,
    html,
    ...(replyTo && { "h:Reply-To": replyTo }),
  };

  await mg.messages.create(
    (customConfig.mailgun.subdomain ? `${customConfig.mailgun.subdomain}.` : "") +
        customConfig.domainName,
    data
  );
};
