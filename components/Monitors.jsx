import React from "react";
import Link from "next/link";

function Monitors() {
  return (
    <>
      <Link href="/" alt="Go back" className="font-bold flex justify-end pr-10 pt-10">
        Home
      </Link>
      <main className="container mx-auto py-10 min-h-screen">
        <div className="flex justify-between m-4">
          <h1 className="text-2xl font-bold">Monitors</h1>
          <Link href="/admin/newMonitor" className="btn btn-lg lg:btn-wide">New monitor</Link>
        </div>
        <h2 className="leading-relaxed text-lg font-medium pb-5 m-4">
        </h2>
      </main>
    </>
  );
}

export default Monitors;
