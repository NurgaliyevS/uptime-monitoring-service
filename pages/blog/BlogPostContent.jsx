import RelatedArticles from "./RelatedArticles";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { format } from "date-fns";
import BlogHeader from "@/components/BlogHeader";
import { renderAst } from "@/utils/renderAst";

function BlogPostContent({ post, relatedPosts }) {
  if (!post) {
    return <div>Loading...</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    description: post.excerpt,
  };

  return (
    <div className="mx-auto">
      <Head>
        <title>{`${post.title} | MVPAgency Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <link
          rel="canonical"
          href={`https://mvpagency.org/blog/${post.slug}`}
        />
        <meta property="og:title" content={`${post.title} | MVPAgency Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:url"
          content={`https://mvpagency.org/blog/${post.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                clipRule="evenodd"
              ></path>
            </svg>
            Back to Blog
          </Link>
        </div>
        <article>
          <section className="my-12 md:my-20 max-w-screen-md">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge badge-sm md:badge-md hover:badge-primary"
                >
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
            <section className="w-full max-md:pt-4 md:pr-20 space-y-12 md:space-y-20">
              <Image
                alt={post.alt}
                src={post.image}
                className="rounded-xl"
                width={700}
                height={500}
              />
              {renderAst(post.contentHtml)}
            </section>
          </div>
          <RelatedArticles currentPost={post} relatedPosts={relatedPosts} />
        </article>
      </main>
      <footer>
        <Footer bgColor={"bg-slate-200"} />
      </footer>
    </div>
  );
}

export default BlogPostContent;
