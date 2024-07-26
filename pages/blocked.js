"use client";

import { signIn } from "next-auth/react";
import React from "react";
import Link from "next/link";
import Head from "next/head";

const Blocked = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="relative bg-neutral text-neutral-content h-screen w-full flex flex-col justify-center gap-8 items-center p-10">
        <h1 className="text-xl md:text-2xl font-medium">Hm, Access Blocked</h1>
        <p>Try again in 1 minute</p>

        <div>
          <button
            onClick={() =>
              signIn(undefined, {
                callbackUrl: "/admin",
              })
            }
            className="link"
          >
            Login
          </button>{" "}
          or{" "}
          <Link className="link" href="/">
            Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default Blocked;
