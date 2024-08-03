/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://uptimefriend.com",
  generateRobotsTxt: true,
  exclude: ["/admin", "/blocked"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://uptimefriend.com/sitemap.xml",
    ],
  },
};
