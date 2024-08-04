import Head from "next/head";
import { format } from "date-fns";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import BlogHeader from "./BlogHeader";
import Link from "next/link";
import Image from "next/image";

export default function BlogPost({ post }) {
  console.log(post, "post");

  return (
    <div className="mx-auto">
      <Head>
        <title>{post.title} | UptimeFriend Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <link
          rel="canonical"
          href={`https://uptimefriend.com/blog/${post.slug}`}
        />
        <meta
          property="og:title"
          content={`${post.title} | UptimeFriend Blog`}
        />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:url"
          content={`https://uptimefriend.com/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${post.title}",
              "datePublished": "${post.date}",
              "dateModified": "${post.date}",
              "author": {
                "@type": "Person",
                "name": "${post.author}"
              },
              "description": "${post.excerpt}"
            }
          `}
        </script>
      </Head>
      <BlogHeader />
      <main className="min-h-screen max-w-6xl mx-auto p-8">
        <div>
          <Link
            href="/blog"
            className="link !no-underline text-base-content/80 hover:text-base-content inline-flex items-center gap-1"
            title={"Back to Blog"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Back to Blog
          </Link>
        </div>
        <article>
          <section className="my-12 md:my-20 max-w-screen-md">
            <div className="flex items-center gap-4 mb-6">
              {post.tags.map((tag) => (
                <span className="badge badge-sm md:badge-md hover:badge-secondary">
                  {tag}
                </span>
              ))}
              <span itemProp="datePublished">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 md:mb-8">
              {post.title}
            </h1>
            <p className="text-base-content/80 md:text-lg max-w-screen-md">
              {post.excerpt}
            </p>
          </section>
          <div className="flex flex-col md:flex-row">
            <section className="max-md:pb-4 md:pl-12 max-md:border-b md:border-l md:order-last md:w-72 shrink-0">
              <p className="text-base-content/80 text-sm mb-2 md:mb-3">
                Posted by
              </p>
              <Link
                href={`/blog/author/sabyr`}
                className="inline-flex items-center gap-2 group"
                title={`Posts By ${post.author}`}
                rel="author"
              >
                <span itemProp="author">
                  <Image
                    src={"/Sabyr_Nurgaliyev.webp"}
                    alt={`Post By ${post.author}`}
                    width={50}
                    height={50}
                    className="w-8 h-8 rounded-full object-cover object-center"
                  />
                </span>
                <span className="group-hover:underline">{post.author}</span>
              </Link>
            </section>
            <section
              className="w-full max-md:pt-4 md:pr-20 space-y-12 md:space-y-20"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            ></section>
          </div>
        </article>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "blog-posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), "blog-posts");
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        slug: params.slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
        tags: data.tags,
        contentHtml,
      },
    },
  };
}
