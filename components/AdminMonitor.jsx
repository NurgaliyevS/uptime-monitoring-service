"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { usePlausible } from "next-plausible";

Modal.setAppElement("#__next");

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

function AdminMonitor({ isEdit, monitor }) {
  const plausible = usePlausible();
  const { data: session } = useSession();
  const [monitorType, setMonitorType] = useState("http");
  const [urlOrIp, setUrlOrIp] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emails, setEmails] = useState([]);
  const [phones, setPhones] = useState([]);
  const [interval, setInterval] = useState(300);
  const [note, setNote] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [userPlan, setUserPlan] = useState("free");
  const [availableMonitors, setAvailableMonitors] = useState(0);
  const [isUrlOrIpValid, setIsUrlOrIpValid] = useState(true);
  const [title, setTitle] = useState("Add");
  const [isLoading, setIsLoading] = useState(false);

  const didMountRef = useRef(false);
  const didMountRef2 = useRef(false);
  const didMountRef3 = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.get(
            `/api/users/user?email=${session.user.email}`
          );
          if (response.data?.success && response.data?.data) {
            const user = response.data.data;
            const variantName = user.variant_name.toLowerCase();
            setUserPlan(variantName);
          }
        } catch (error) {
          console.error("Error fetching user plan:", error);
          toast.error("Failed to fetch user plan");
        }
      }
    };

    if (!didMountRef.current && session?.user?.email) {
      fetchUserPlan();
      didMountRef.current = true;
    }
  }, [session]);

  useEffect(() => {
    const fetchUserMonitors = async () => {
      if (session?.user?.email && availableMonitors === 0) {
        try {
          const response = await axios.get(
            `/api/core/monitors?email=${session.user.email}`
          );
          if (response.data?.success && response.data?.data) {
            const monitors = response.data.data;
            console.log(monitors.length, "monitors");
            setAvailableMonitors(monitors.length);
          }
        } catch (error) {
          console.error("Error fetching user monitors:", error);
        }
      }
    };

    if (!didMountRef2.current && session?.user?.email) {
      fetchUserMonitors();
      didMountRef2.current = true;
    }
  }, [session]);

  useEffect(() => {
    const editMode = () => {
      if (isEdit) {
        setTitle("Edit");
      }
      if (monitor) {
        setUrlOrIp(monitor.url_or_ip);
        const emailsBackend = monitor.notification_emails;
        const notificationPhones = monitor.notification_phones;

        if (emailsBackend.length) {
          setEmails(emailsBackend);
        }

        if (notificationPhones.length) {
          setPhones(notificationPhones);
        }

        if (monitor.note) {
          setNote(monitor.note);
        }
      }
    };

    if (!didMountRef3.current && (isEdit || (monitor && Object.keys(monitor).length > 0))) {
      editMode();
      didMountRef3.current = true;
    }
  }, [isEdit, monitor]);

  const planLimits = {
    free: { monitors: 0, interval: 300, sms: 1, emails: 1 },
    personal: { monitors: 5, interval: 120, sms: 3, emails: 3 },
    team: { monitors: 10, interval: 60, sms: 5, emails: 5 },
    enterprise: { monitors: 20, interval: 60, sms: 10, emails: 10 },
  };

  const currentLimits = planLimits[userPlan];

  const validateUrlOrIp = (value) => {
    if (monitorType === "http") {
      const urlPattern =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      return urlPattern.test(value);
    } else {
      const ipPattern =
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const hostPattern =
        /^([a-zA-Z0-9]+([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
      return ipPattern.test(value) || hostPattern.test(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUrlOrIp(urlOrIp)) {
      setIsUrlOrIpValid(false);
      toast.error("Please enter a valid URL or IP address.");
      return;
    }
    if (emails.length === 0 && phones.length === 0) {
      toast.error("Please add at least one email or phone number.");
      return;
    }

    setIsUrlOrIpValid(true);
    setIsLoading(true);
    try {
      const monitorData = {
        user_email: session.user.email,
        monitor_type: monitorType,
        url_or_ip: urlOrIp,
        notification_emails: emails,
        notification_phones: phones,
        interval,
        note,
      };

      if (isEdit) {
        monitorData["id"] = monitor._id;
        const response = await axios.put("/api/core/monitors", monitorData);
        if (response.data.success) {
          toast.success("Monitor updated successfully");
          router.push("/admin");
        }
      } else {
        const response = await axios.post("/api/core/monitors", monitorData);
        if (response.data.success) {
          toast.success("Monitor added successfully");
        }
      }
    } catch (error) {
      console.error("Error adding monitor:", error);
    } finally {
      setIsLoading(false);
      router.push("/admin");
    }
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
    if (!validatePhoneNumber(phone) || phone.trim() === '') {
      toast.error("Please enter a valid phone number.");
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

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9+\-\(\)\s]*$/;
    return phoneRegex.test(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (validatePhoneNumber(value)) {
      setPhone(value);
    }
  };

  const allIntervals = [60, 120, 300];

  return (
    <>
      <div className="flex justify-end pr-10 pt-10">&nbsp;</div>
      <main className="container mx-auto py-10 m-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">{title} Monitor</h1>
          <Link href="/admin" alt="Go back" className="">
            Monitoring
          </Link>
        </div>
        <h2 className="leading-relaxed text-lg font-medium pb-5 my-4">
          Your current plan -{" "}
          <strong className="relative text-secondary">
            {userPlan.toUpperCase()}
          </strong>
        </h2>
        <section className="card bg-base-100 lg:w-full shadow-xl p-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Monitor Type */}
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

            {/* URL or IP */}
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
                className={`input input-bordered w-full text-black ${
                  isUrlOrIpValid ? "" : "input-error"
                }`}
                value={urlOrIp}
                onChange={(e) => {
                  setUrlOrIp(e.target.value);
                  setIsUrlOrIpValid(validateUrlOrIp(e.target.value));
                }}
                placeholder={
                  monitorType === "http"
                    ? "https://example.com"
                    : "192.168.0.1 or example.com"
                }
              />
              {!isUrlOrIpValid && (
                <p className="text-red-500 text-sm">
                  {monitorType === "http"
                    ? "Please enter a valid URL."
                    : "Please enter a valid IP address or host."}
                </p>
              )}
            </div>

            {/* Notification Methods */}
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
                    disabled={emails.length >= currentLimits?.emails}
                  >
                    E-mail
                  </button>
                </div>
                <div className="tooltip" data-tip="IN PROGRESS">
                  <button
                    type="button"
                    className="btn btn-info btn-wide"
                    onClick={() => setShowPhoneModal(true)}
                    // disabled={phones.length >= currentLimits?.sms}
                    disabled={true}
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

            {/* Monitor Interval */}
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
                    disabled={intv < currentLimits?.interval}
                  >
                    {intv / 60}min{" "}
                    {intv < currentLimits?.interval ? "(Paid feature)" : ""}
                  </option>
                ))}
              </select>
              <p className="text-sm mt-1">
                Your monitor will be checked every {interval / 60} minutes. We
                recommend using at least 1-minute checks available in paid
                plans.
              </p>
            </div>

            {/* Note */}
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

            <div className="tooltip" data-tip="Paid Feature to add more">
              <button
                type="submit"
                className="btn btn-secondary btn-wide"
                disabled={availableMonitors >= currentLimits?.monitors || isLoading}
                onClick={() => {
                  plausible("ADD_MONITOR");
                }}
              >
                Add Monitor
              </button>
            </div>
          </form>

          {/* Email Modal */}
          <Modal
            isOpen={showEmailModal}
            onRequestClose={() => setShowEmailModal(false)}
            contentLabel="Add Email"
            className={`modal-box ${customStyles.content} w-full p-4 shadow-xl rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            style={customStyles.content}
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

          {/* Phone Modal */}
          <Modal
            isOpen={showPhoneModal}
            onRequestClose={() => setShowPhoneModal(false)}
            contentLabel="Add Phone Number"
            className={`modal-box ${customStyles.content} w-full p-4 shadow-xl rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            style={customStyles.content}
          >
            <h3 className="font-bold text-lg">Add Phone Number</h3>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="input input-bordered w-full mt-2"
              value={phone}
              onChange={handlePhoneChange}
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

export default AdminMonitor;
