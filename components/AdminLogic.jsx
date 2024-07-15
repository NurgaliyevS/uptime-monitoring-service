"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

function AdminLogic() {
  const { data: session } = useSession();
  const [monitorType, setMonitorType] = useState("http");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interval, setInterval] = useState(300); // 5 minutes default
  const [note, setNote] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [userPlan, setUserPlan] = useState("free");

  useEffect(() => {
    // Fetch user plan from the backend
    const fetchUserPlan = async () => {
      if (session?.user?.email) {
        const response = await axios.get("/api/users/user?email=" + session.user.email);
        console.log(response.data);

        if (response.data?.success && response.data?.data) {
            const user = response.data.data;
            const variantName = user.variant_name.toLowerCase();
            console.log(user);
            setUserPlan(variantName);
        }
      }
    };
    fetchUserPlan();
  }, [session]);

  const planLimits = {
    free: { monitors: 5, interval: 300, sms: 5, emails: 5 },
    personal: { monitors: 10, interval: 180, sms: 50, emails: 100 },
    team: { monitors: 20, interval: 60, sms: 100, emails: 200 },
    enterprise: { monitors: 50, interval: 30, sms: 200, emails: 500 },
  };

  const currentLimits = planLimits[userPlan];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ monitorType, email, phone, interval, note });
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Monitor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Monitor Type</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={monitorType}
            onChange={(e) => setMonitorType(e.target.value)}
          >
            <option value="http">HTTP / Website Monitoring</option>
            <option value="ping">Ping Monitoring</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Notification Methods</span>
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowEmailModal(true)}
            >
              Add Email
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowPhoneModal(true)}
            >
              Add Phone Number
            </button>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Monitor Interval (seconds)</span>
          </label>
          <input
            type="range"
            // min={currentLimits.interval}
            max={300}
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="range"
            step="30"
            min={0}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>{currentLimits.interval}s</span>
            <span>300s</span>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Note (Optional)</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Monitor
        </button>
      </form>

      {showEmailModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Email</h3>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowEmailModal(false)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowEmailModal(false)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showPhoneModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Phone Number</h3>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="input input-bordered w-full mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowPhoneModal(false)}>
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowPhoneModal(false)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminLogic;
