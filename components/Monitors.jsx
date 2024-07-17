"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";

function Monitors() {
  const { data: session } = useSession();
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    const fetchMonitors = async () => {
      if (session) {
        try {
          const email = session.user.email;
          const response = await axios.get(`/api/core/monitors?email=${email}`);
          if (response.data?.success && response.data?.data) {
            setMonitors(response.data.data);
            console.log("Monitors:", response.data.data);
          }
        } catch (error) {
          console.error("Error fetching monitors:", error);
        }
      }
    };

    fetchMonitors();
  }, [session]);

  return (
    <>
      <Link
        href="/"
        alt="Go back"
        className="font-bold flex justify-end pr-10 pt-10"
      >
        Home
      </Link>
      <main className="container mx-auto py-10 min-h-screen">
        <div className="flex justify-between m-4">
          <h1 className="text-2xl font-bold">Monitors</h1>
          <Link href="/admin/newMonitor" className="btn btn-lg lg:btn-wide">
            New monitor
          </Link>
        </div>
        <h2 className="leading-relaxed text-lg font-medium pb-5 m-4"></h2>
        {monitors.length > 0 ? (
          <ul>
            {monitors.map((monitor, index) => (
              <li key={index}>{monitor.monitor_type}</li>
            ))}
          </ul>
        ) : (
          <p>No monitors found</p>
        )}
      </main>
    </>
  );
}

export default Monitors;
