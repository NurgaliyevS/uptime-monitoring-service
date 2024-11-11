import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

const RelatedArticles = ({ currentPost, relatedPosts }) => {
  if (!Array.isArray(relatedPosts) || relatedPosts.length === 0) {
    return null;
  }

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="card bg-slate-200 rounded-2xl border border-slate-200 flex flex-col h-full"
          >
            <figure className="h-48">
              <img
                alt={post.alt}
                src={post.image}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-sm hover:badge-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold line-clamp-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="link link-hover hover:link-primary"
                    title={post.title}
                  >
                    {post.title}
                  </Link>
                </h3>
              </div>
              <p className="text-base-content/80 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm mt-auto">
                <Link
                  href={`/blog/author/${post.author.toLowerCase()}`}
                  className="inline-flex items-center gap-2 group"
                  title={`Post By ${post.author}`}
                  rel="author"
                >
                  <span itemProp="author">
                    <Image
                      src="/Sabyr_Nurgaliyev.webp"
                      alt={`Post By ${post.author}`}
                      width={50}
                      height={50}
                      className="w-8 h-8 rounded-full object-cover object-center"
                    />
                  </span>
                  <span className="group-hover:underline">{post.author}</span>
                </Link>
                <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
