import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminMonitor from "@/components/AdminMonitor";

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
    <div className="bg-slate-800 text-base-300">
      <AdminMonitor isEdit={true} monitor={monitor} />
    </div>
  );
}
