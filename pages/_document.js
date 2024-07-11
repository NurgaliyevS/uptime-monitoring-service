import { customConfig } from "@/project.custom.config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      data-theme={customConfig.dataTheme}
      className="scroll-smooth"
    >
      <Head>
        <meta
          name="keywords"
          content="website monitoring, web monitoring, site downtime, website monitoring tools, website uptime monitoring, website monitoring services, site monitoring, server uptime, uptime web hosting, uptime robot alternative"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
