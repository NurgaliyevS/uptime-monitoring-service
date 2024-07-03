import { customConfig } from "@/project.custom.config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme={customConfig.dataTheme}>
      <Head>
        <meta
          name="keywords"
          content="uptime web hosting, monitoring saas, server monitoring saas, monitoring saas applications, uptime robot alternatives"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
