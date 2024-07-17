"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

function Monitors() {
  const { data: session } = useSession();
  const [monitors, setMonitors] = useState([]);
  const [selectedMonitors, setSelectedMonitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleCheckboxChange = (monitorId) => {
    setSelectedMonitors(prev => 
      prev.includes(monitorId)
        ? prev.filter(id => id !== monitorId)
        : [...prev, monitorId]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.post('/api/core/monitors/delete', { ids: selectedMonitors });
      setMonitors(prev => prev.filter(monitor => !selectedMonitors.includes(monitor._id)));
      setSelectedMonitors([]);
    } catch (error) {
      console.error("Error deleting monitors:", error);
    }
  };

  const handleDeleteMonitor = async (id) => {
    setIsLoading(true);
    try {
      const response =  await axios.delete(`/api/core/monitors?id=${id}`);
      if (!response.data?.success) {
        console.error("Error deleting monitor:", response.data?.message);
        return;
      }
      if (response.data?.success) {
        toast.success("Monitor deleted successfully");
      }
      setMonitors(prev => prev.filter(monitor => monitor._id !== id));
    } catch (error) {
      console.error("Error deleting monitor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToMonitor = (id) => {
    router.push(`/admin/monitor/${id}`);
  };

  return (
    <>
      <Link
        href="/"
        alt="Go back"
        className="font-bold flex justify-end pr-10 pt-10"
      >
        Home
      </Link>
      <main className="container mx-auto py-10 min-h-screen m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Monitors</h1>
          <Link href="/admin/newMonitor" className="btn btn-lg lg:btn-wide">
            New monitor
          </Link>
        </div>
        <h2 className="leading-relaxed text-lg font-medium pb-5 m-4"></h2>
        {monitors.length > 0 ? (
          <div className="space-y-4">
            {selectedMonitors.length > 0 && (
              <button onClick={handleDeleteSelected} className={`btn btn-error ${isLoading ? "btn-neutral" : ""}`} disabled={
                isLoading || selectedMonitors.length === 0
              }>
                Delete Selected
              </button>
            )}
            {monitors.map((monitor) => (
              <div key={monitor._id} className="card bg-base-100 shadow-xl">
                <div className="card-body flex flex-row items-center">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedMonitors.includes(monitor._id)}
                    onChange={() => handleCheckboxChange(monitor._id)}
                  />
                  <div className="flex-grow ml-4">
                    <h2 className="card-title text-black">{monitor.url_or_ip}</h2>
                    <p className={`text-${monitor.latest_incident?.status === 'down' ? 'error' : 'success'} text-black`}>
                      {monitor.latest_incident?.status === 'down' ? 'Down' : 'Up'} 
                      {monitor.latest_incident?.started && ` - ${new Date(monitor.latest_incident.started).toLocaleString()}`}
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigateToMonitor(monitor._id)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-error"
                      onClick={() => handleDeleteMonitor(monitor._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No monitors added</p>
        )}
      </main>
    </>
  );
}

export default Monitors;