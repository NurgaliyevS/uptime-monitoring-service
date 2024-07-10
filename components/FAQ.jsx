"use client";

import { useRef, useState } from "react";

const faqList = [
  {
    question: "What is website monitoring and why do I need it?",
    answer: (
      <p>
        Website monitoring involves tracking your site's performance and uptime.
        It helps you identify and resolve issues faster, reduces downtime, and
        provides a better user experience. Our service, UptimeFriend, offers
        comprehensive web monitoring tools to keep your site running smoothly.
      </p>
    ),
  },
  {
    question: "How does UptimeFriend notify me of site downtime?",
    answer: (
      <p>
        UptimeFriend instantly notifies you via email and SMS whenever your site
        experiences downtime. This will allow you to address issues quickly and
        minimize the impact on your business.
      </p>
    ),
  },
  {
    question: "What types of monitoring does UptimeFriend offer?",
    answer: (
      <p>
        UptimeFriend offers HTTP web monitoring and ping monitoring. These tools
        help you monitor the availability of your website and the status of
        network devices, ensuring that your website stays online and works.
      </p>
    ),
  },
  {
    question: "Can team members get notifications too?",
    answer: (
      <p>
        You can add their email addresses and phone numbers. They will receive
        the same notifications as you do.
      </p>
    ),
  },
  {
    question: "How often does UptimeFriend check my website’s uptime?",
    answer: (
      <p>
        The monitoring interval depends on your subscription settings. The Free
        plan checks every 5 minutes, the Personal plan every 3 minutes, the Team
        plan every 1 minute, and the Enterprise plan every 30 minutes.
      </p>
    ),
  },
  {
    question:
      "What is the difference between HTTP monitoring and ping monitoring?",
    answer: (
      <p>
        HTTP monitoring checks the availability of your website through HTTP
        requests to your site, while ping monitoring checks the availability of
        your network devices by sending ICMP echo requests (pings). Both types
        of monitoring help keep your website and network online.
      </p>
    ),
  },
  {
    question: "Are there discounts for new users?",
    answer: (
      <p>
        Yes, we are currently offering a LAUNCH discount of 50% off. This is a
        great opportunity to test our services at a discounted price.
      </p>
    ),
  },
  {
    question: "How does UptimeFriend help in server uptime web hosting?",
    answer: (
      <p>
        UptimeFriend constantly monitors your server and web hosting uptime,
        promptly issuing alerts if it detects any issues. This approach helps
        maintain high uptime and reliability for your website.
      </p>
    ),
  }
];

const FaqItem = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className={`flex-1 ${isOpen ? "text-secondary" : ""}`}>
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

function FAQ() {
  return (
    <section
      className="bg-slate-800 text-gray-300 py-44 overflow-hidden"
      id="faq"
    >
      <div className="px-8 container max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="sm:text-4xl text-3xl font-extrabold">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FAQ;
