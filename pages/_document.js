import { customConfig } from "@/project.custom.config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      data-theme={customConfig.colors.theme}
      className="scroll-smooth"
    >
      <Head>
        <meta
          name="keywords"
          content="website monitoring, web monitoring, site downtime, website monitoring tools, website uptime monitoring, website monitoring services, site monitoring, server uptime, uptime web hosting, uptime robot alternative"
        />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#fafafa" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="UptimeFriend" />
        <meta name="application-name" content="UptimeFriend" />
        <meta
          property="og:title"
          content="UptimeFriend - Monitor your website, and server"
        />
        <meta
          property="og:description"
          content="Start monitoring in 30 seconds. Get notified by email, and SMS. Monitor your website, and server."
        />
        <meta property="og:url" content="https://uptimefriend.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="UptimeFriend" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:image"
          content="https://uptimefriend.com/og-image.png"
        />
        <meta
          property="og:image:alt"
          content="UptimeFriend - Monitor your website, and server"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="article:author"
          content="https://x.com/tech_nurgaliyev"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tech_nurgaliyev" />
        <meta name="twitter:creator" content="@tech_nurgaliyev" />
        <meta
          name="twitter:title"
          content="UptimeFriend - Monitor your website, and server"
        />
        <meta
          name="twitter:description"
          content="Start monitoring in 30 seconds. Get notified by email, and SMS. Monitor your website, and server."
        />
        <meta
          name="twitter:image"
          content="https://uptimefriend.com/twitter.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="180x180"
          href="/favicon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
