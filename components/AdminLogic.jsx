"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#__next"); // Specify the root element for accessibility

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function AdminLogic() {
  const { data: session } = useSession();
  const [monitorType, setMonitorType] = useState("http");
  const [urlOrIp, setUrlOrIp] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emails, setEmails] = useState([]); // New state to store emails
  const [phones, setPhones] = useState([]); // New state to store phone numbers
  const [interval, setInterval] = useState(300); // 5 minutes default
  const [note, setNote] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [userPlan, setUserPlan] = useState("free");

  const didMountRef = useRef(false);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (session?.user?.email) {
        const response = await axios.get(
          "/api/users/user?email=" + session.user.email
        );
        if (response.data?.success && response.data?.data) {
          const user = response.data.data;
          const variantName = user.variant_name.toLowerCase();
          const email = user.email;
          setUserPlan(variantName);
          setEmails([email]);
        }
      }
    };

    if (didMountRef.current) fetchUserPlan();
    else didMountRef.current = true;
  }, [session]);

  const planLimits = {
    free: { monitors: 5, interval: 300, sms: 1, emails: 1 },
    personal: { monitors: 10, interval: 180, sms: 3, emails: 3 },
    team: { monitors: 20, interval: 60, sms: 5, emails: 5 },
    enterprise: { monitors: 50, interval: 30, sms: 10, emails: 10 },
  };

  const currentLimits = planLimits[userPlan];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ monitorType, urlOrIp, email, phone, interval, note });
  };

  const handleAddEmail = () => {
    if (emails.length >= currentLimits.emails) {
      toast.error(
        `You have reached the limit of ${currentLimits.emails} emails for your plan.`
      );
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmails([...emails, email]);
    setEmail("");
    setShowEmailModal(false);
    toast.success("Email added successfully!");
  };

  const handleAddPhone = () => {
    if (phones.length >= currentLimits.sms) {
      toast.error(
        `You have reached the limit of ${currentLimits.sms} phone numbers for your plan.`
      );
      return;
    }
    setPhones([...phones, phone]);
    setPhone("");
    setShowPhoneModal(false);
    toast.success("Phone number added successfully!");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const allIntervals = [30, 60, 180, 300];

  return (
    <>
      <div className="flex justify-end pr-10 pt-10">
      &nbsp;
      </div>
      <main className="container mx-auto py-10">
        <div className="flex justify-between m-4">
          <h1 className="text-2xl font-bold mb-4">Add Monitor</h1>
          <Link href="/admin" alt="Go back" className="">
            Monitoring
          </Link>
        </div>
        <h2 className="leading-relaxed text-lg font-medium pb-5 m-4">
          Your current plan -<strong> {userPlan.toUpperCase()}</strong>
        </h2>
        <section className="card bg-base-100 lg:w-full shadow-xl p-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Monitor Type</span>
              </label>
              <select
                className="select select-bordered w-full text-black"
                value={monitorType}
                onChange={(e) => setMonitorType(e.target.value)}
              >
                <option value="http">HTTP / Website Monitoring</option>
                <option value="ping">Ping Monitoring</option>
              </select>
              <p className="text-sm mt-1">
                {monitorType === "http"
                  ? "Use HTTP(S) monitor to monitor your website, API endpoint, or anything running on HTTP."
                  : "Make sure your server or any device in the network is always available."}
              </p>
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  {monitorType === "http"
                    ? "URL to monitor"
                    : "IP or host to monitor"}
                </span>
              </label>
              <input
                type={monitorType === "http" ? "url" : "text"}
                className="input input-bordered w-full text-black"
                value={urlOrIp}
                onChange={(e) => setUrlOrIp(e.target.value)}
                placeholder={
                  monitorType === "http"
                    ? "https://example.com"
                    : "example.com or 192.168.1.1"
                }
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">How will we notify you?</span>
              </label>
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="tooltip" data-tip="Paid Feature">
                  <button
                    type="button"
                    className="btn btn-success btn-wide"
                    onClick={() => setShowEmailModal(true)}
                    disabled={emails.length >= currentLimits.emails}
                  >
                    E-mail
                  </button>
                </div>
                <div className="tooltip" data-tip="Paid Feature">
                  <button
                    type="button"
                    className="btn btn-info btn-wide"
                    onClick={() => setShowPhoneModal(true)}
                    disabled={phones.length >= currentLimits.sms}
                  >
                    SMS message
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-black btn-wide">
                    Added Emails
                  </h3>
                  <ul className="text-black">
                    {emails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-black btn-wide">
                    Added Phone Numbers
                  </h3>
                  <ul className="text-black">
                    {phones.map((phone, index) => (
                      <li key={index}>{phone}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Monitor interval</span>
              </label>
              <select
                className="select select-bordered w-full text-black"
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
              >
                {allIntervals.map((intv) => (
                  <option
                    key={intv}
                    value={intv}
                    disabled={intv < currentLimits.interval}
                  >
                    {intv / 60}m{" "}
                    {intv < currentLimits.interval ? "(Paid feature)" : ""}
                  </option>
                ))}
              </select>
              <p className="text-sm mt-1">
                Your monitor will be checked every {interval / 60} minutes. We
                recommend to use at least 1-minute checks available in paid
                plans.
              </p>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Note (Optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full text-black"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-secondary btn-wide">
              Add Monitor
            </button>
          </form>

          <Modal
            isOpen={showEmailModal}
            onRequestClose={() => setShowEmailModal(false)}
            contentLabel="Add Email"
            className={`modal-box ${customStyles.content} w-full p-4 shadow-xl rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            customStyles={customStyles.content}
          >
            <h3 className="font-bold text-lg">Add Email</h3>
            <input
              type="email"
              placeholder="Enter email"
              className="input input-bordered w-full mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="mt-2">No delay, no repeat</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowEmailModal(false)}>
                Close
              </button>
              <button className="btn btn-success" onClick={handleAddEmail}>
                Add
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={showPhoneModal}
            onRequestClose={() => setShowPhoneModal(false)}
            contentLabel="Add Phone Number"
            className={`modal-box ${customStyles.content} w-full p-4 shadow-xl rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            customStyles={customStyles.content}
          >
            <h3 className="font-bold text-lg">Add Phone Number</h3>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="input input-bordered w-full mt-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="mt-2">No delay, no repeat</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowPhoneModal(false)}>
                Close
              </button>
              <button className="btn btn-success" onClick={handleAddPhone}>
                Add
              </button>
            </div>
          </Modal>
        </section>
      </main>
    </>
  );
}

export default AdminLogic;
