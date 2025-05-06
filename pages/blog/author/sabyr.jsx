import Footer from "@/components/Footer";
import BlogHeader from "../../../components/BlogHeader";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function Sabyr({ posts }) {
  console.log(posts, "posts sabyr");
  return (
    <div className="mx-auto">
      <Head>
        <title>Sabyr Nurgaliyev, author at UptimeFriend Blog</title>
        <meta
          name="description"
          content={"Sabyr Nurgaliyev, Author at UptimeFriend's Blog"}
        />
        <meta name="keywords" content={"UptimeFriend.com"} />
        <link
          rel="canonical"
          href={`https://uptimefriend.com/blog/author/sabyr`}
        />
        <meta
          property="og:title"
          content={`Sabyr Nurgaliyev, Author at UptimeFriend's Blog`}
        />
        <meta
          property="og:description"
          content={
            "Start monitoring in 30 seconds. Get notified by email, and SMS. Monitor your website, and server."
          }
        />
        <meta
          property="og:url"
          content={`https://uptimefriend.com/blog/author/sabyr`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <BlogHeader />
      <main className="min-h-screen max-w-6xl mx-auto p-8">
        <section className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 mt-12 mb-24 md:mb-32">
          <div>
            <p className="text-xs uppercase tracking-wide text-base-content/80 mb-2">
              Authors
            </p>
            <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-2">
              Sabyr Nurgaliyev
            </h1>
            <p className="md:text-lg mb-6 md:mb-10 font-medium">
              Creator of UptimeFriend
            </p>
            <p className="md:text-lg text-base-content/80">
              Sabyr is a developer and an entrepreneur. He's built 3 startups in
              the last 2 months. He is the founder of UptimeFriend.
            </p>
          </div>
          <div className="max-md:order-first flex md:flex-col gap-4 shrink-0">
            <Image
              src={"/Sabyr_Nurgaliyev.webp"}
              alt={`Sabyr Nurgaliyev - UptimeFriend Founder`}
              width={256}
              height={256}
              className="rounded-2xl"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="https://x.com/tech_nurgaliyev"
                target="_blank"
                title="X tech_nurgaliyev"
                onClick={() => {
                //   plausible("X");
                }}
              >
                <Image
                  src={"/x.png"}
                  alt="X"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sabyr-n-43b4a822a/"
                target="_blank"
                title="Linkedin sabyr-nurgaliyev"
                onClick={() => {
                //   plausible("LINKEDIN");
                }}
              >
                <Image
                  src={"/linkedin.svg"}
                  alt="Linkedin"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer bgColor={"bg-slate-200"} />
      </footer>
    </div>
  );
}

export default Sabyr;
