import React from "react";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";

const generateId = (text) => {
  // Handle cases where text might be a React element or non-string
  if (typeof text !== "string") {
    // If text is an array (React children), try to extract string content
    if (Array.isArray(text)) {
      text = text
        .map((child) =>
          typeof child === "string"
            ? child
            : child?.props?.children
            ? child.props.children
            : ""
        )
        .join("");
    } else if (text?.props?.children) {
      // Handle React elements
      text = text.props.children;
    } else {
      // If we can't extract meaningful text, return empty string
      return "";
    }
  }

  // Convert to string explicitly and generate ID
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const renderAst = (content) =>
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRaw)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        h2: (props) => (
          <section className="article">
            <h2
              id={generateId(props.children[0])}
              className="text-2xl lg:text-4xl font-extrabold tracking-tight mb-4 text-base-content"
              {...props}
            />
          </section>
        ),
        h3: (props) => (
          <section className="article">
            <h3
              id={generateId(props.children[0])}
              className="text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content"
              {...props}
            />
          </section>
        ),
        h4: (props) => (
          <section className="article">
            <h4
              id={generateId(props.children[0])}
              className="text-lg lg:text-xl font-bold tracking-tight mb-2 text-base-content"
              {...props}
            />
          </section>
        ),
        h5: (props) => (
          <section className="article">
            <h5
              id={generateId(props.children[0])}
              className="text-base-content/90 font-bold tracking-tight mb-2 text-base-content"
              {...props}
            />
          </section>
        ),
        strong: (props) => <strong className="text-base-content" {...props} />,
        ol: (props) => (
          <ol
            className="list-decimal text-base-content/90 leading-relaxed pl-5"
            {...props}
          />
        ),
        ul: (props) => (
          <ul
            className="list-disc text-base-content/90 leading-relaxed pl-5"
            {...props}
          />
        ),
        li: (props) => (
          <li className="list-item pl-1 marker:mr-2">{props.children}</li>
        ),
        img: (props) => {
          return (
            <img className={`rounded-xl mt-4`} {...props} loading="lazy" />
          );
        },
        p: (props) => {
          const content = props.children.map((child) => {
            if (typeof child === "string") {
              return child.split("\n").map((text, index, array) => (
                <React.Fragment key={index}>
                  {text}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ));
            }
            return child;
          });

          return (
            <p className="text-base-content/90 leading-relaxed">{content}</p>
          );
        },
        table: (props) => (
          <div className="overflow-x-auto my-4 text-base-content border rounded-xl">
            <table className="table w-full" {...props} />
          </div>
        ),
        thead: (props) => <thead {...props} />,
        tbody: (props) => <tbody {...props} />,
        tr: (props) => <tr className="border-b" {...props} />,
        th: (props) => (
          <th
            className="bg-base-200 px-4 py-2 text-left font-bold"
            {...props}
          />
        ),
        td: (props) => <td className="px-4 py-2" {...props} />,
        a: (props) => (
          <a className="link link-primary" rel="nofollow" {...props} />
        ),
        hr: (props) => null,
      },
    })
    .processSync(content).result;
