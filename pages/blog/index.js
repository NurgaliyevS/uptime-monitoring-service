import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import BlogHeader from "./BlogHeader";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function BlogIndex({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="mx-auto">
      <Head>
        <title>UptimeFriend Blog</title>
        <meta
          name="description"
          content="Latest posts from UptimeFriend on website monitoring and uptime"
        />
        <meta
          name="keywords"
          content="website monitoring, uptime, server monitoring, tech blog"
        />
        <link rel="canonical" href="https://uptimefriend.com/blog" />
      </Head>
      <BlogHeader />
      <main className="min-h-screen max-w-6xl mx-auto p-8">
        <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
          <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
            UptimeFriend Blog
          </h1>
          <p className="text-lg opacity-80 leading-relaxed pb-5">
            Learn how to check if website is down, how to check server uptime,
            save money on monitoring, and handle uptime monitoring.
          </p>
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full p-2 mb-4 border rounded-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>
        <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
          {filteredPosts.map((post) => (
            <article className="card bg-slate-200 rounded-2xl border border-slate-200">
              <figure></figure>
              <div className="card-body">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span className="badge badge-sm md:badge-md hover:badge-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mb-1 text-xl md:text-2xl font-bold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="link link-hover hover:link-secondary"
                    title={post.title}
                  >
                    {post.title}
                  </Link>
                </h2>
                {/* <p className="text-sm text-gray-500">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </p>
                <p>{post.excerpt}</p> */}
                <div className="text-base-content/80 space-y-4">
                  <p>{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <Link
                      href={`/blog/author/sabyr`}
                      className="inline-flex items-center gap-2 group"
                      title={`Post By ${post.author}`}
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
                      <span className="group-hover:underline">
                        {post.author}
                      </span>
                    </Link>
                    <span itemProp="datePublished">
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer>
        <Footer bgColor={"bg-slate-200"} />
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "blog-posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      tags: data.tags,
    };
  });

  return {
    props: {
      posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date)),
    },
  };
}
