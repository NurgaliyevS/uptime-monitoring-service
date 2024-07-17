// pages/admin/monitor/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MonitorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [monitor, setMonitor] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchMonitor = async () => {
        try {
          const response = await axios.get(`/api/core/monitors?id=${id}`);
          if (response.data?.success && response.data?.data) {
            setMonitor(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching monitor:", error);
        }
      };
      fetchMonitor();
    }
  }, [id]);

  if (!monitor) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">{monitor.url_or_ip}</h1>
      <p>Type: {monitor.monitor_type}</p>
      <p>Interval: {monitor.interval} seconds</p>
      <p>Status: {monitor.latest_incident?.status || 'Unknown'}</p>
      {/* Add more details as needed */}
    </div>
  );
}