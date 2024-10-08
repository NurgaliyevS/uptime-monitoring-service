import Image from "next/image";
import Link from "next/link";
import { handleSignIn } from "./handleSignIn";
import { buyProduct } from "./buyProduct";
import { usePlausible } from "next-plausible";

function Pricing(props) {
  const plausible = usePlausible();
  return (
    <section className="bg-slate-800 text-gray-300 py-44 flex flex-col overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-center px-10 text-center mb-20 flex-col gap-10 lg:gap-14">
          <div>
            <div className="badge animate-bounce whitespace-nowrap badge-secondary">
              ✨ LAUNCH discount — 50% OFF 3 months ✨
            </div>
          </div>
          <h2
            className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4"
            id="pricing"
          >
            <strong className="relative text-secondary">Pricing</strong>
          </h2>
          {/* <p className="text-xl opacity-80 leading-relaxed">
            Save <strong className="relative text-secondary">30%</strong> with
            annual billing<strong className="relative text-secondary">.</strong>
          </p> */}
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-5">

          {/* free removed */}
          {/* <div className="card bg-[#fafafa] w-80 shadow-xl text-[#151515] mx-auto lg:mx-0">
            <div className="flex flex-row justify-between items-center pl-8 pr-8 pt-8">
              <h3 className="font-bold text-2xl lg:text-3xl tracking-tight">
                <strong className="relative">Free</strong>
              </h3>
              <Image
                // src={"/team.svg"}
                src={"/person.svg"}
                alt="HTTP Website Monitoring - UptimeFriend.com"
                width={80}
                height={80}
                className=" w-20 h-20"
              />
            </div>
            <div className="card-body">
              <div className="flex">
                <p className="text-neutral-500 max-w-fit">$</p>
                <p className="max-w-fit font-bold text-5xl ml-1 mr-2">0 </p>
                <p className="text-neutral-500 max-w-fit mt-auto">/ month</p>
              </div>

              <p className="text-neutral-500">
                Made for your hobbies. <br /> No credit card needed!
              </p>

              <Link
                href="#"
                className="btn rounded-full my-2 no-underline"
                onClick={handleSignIn}
              >
                Get Started
              </Link>

              <h4 className="font-bold text-xl tracking-tight">1 monitor</h4>

              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>5-minute monitoring interval</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>HTTP & ping monitoring</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    5 SMS{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    5 emails{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    1 phone number{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    1 email address{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </div> */}

          <div className="card bg-[#fafafa] w-80 shadow-xl text-[#151515] mx-auto lg:mx-0">
            <div className="flex flex-row justify-between items-center pl-8 pr-8 pt-8">
              <h3 className="font-bold text-2xl lg:text-3xl tracking-tight">
                <strong className="relative">Personal</strong>
              </h3>
              <Image
                // src={"/team.svg"}
                src={"/person.svg"}
                alt="HTTP Website Monitoring - UptimeFriend.com"
                width={80}
                height={80}
                className=" w-20 h-20"
              />
            </div>
            <div className="card-body">
              <div className="flex items-end gap-2">
                <div className="flex flex-col mb-1 text-lg">
                  <p className="relative opacity-80">
                    <span className="absolute bg-base-content h-[0.1em] inset-x-0 top-1/2"></span>
                    <span className="text-base-content">$9.98</span>
                  </p>
                </div>
                <span className="text-5xl tracking-tight font-extrabold">
                  $4.99
                </span>
                <div className="flex flex-col mb-1">
                  <p className="text-xs opacity-60 uppercase font-semibold">
                    USD
                  </p>
                </div>
              </div>

              <p className="text-neutral-500">Ideal for small projects.</p>

              <button
                className="btn btn-secondary rounded-full my-2"
                onClick={(e) => {
                  e.preventDefault();
                  plausible("SUBSCRIBE_NOW_PERSONAL");
                  buyProduct();
                }}
              >
                Subscribe now
              </button>

              <h4 className="font-bold text-xl tracking-tight">5 monitors</h4>

              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>2-minute monitoring interval</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>HTTP & ping monitoring</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    50 SMS{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    100 Emails{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    3 phone number{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    3 email address{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-[#fafafa] w-80 shadow-xl text-[#151515] mx-auto lg:mx-0">
            <div className="flex flex-row justify-between items-center pl-8 pr-8 pt-8">
              <h3 className="font-bold text-2xl lg:text-3xl tracking-tight">
                <strong className="relative">Team</strong>
              </h3>
              <Image
                src={"/team.svg"}
                alt="HTTP Website Monitoring - UptimeFriend.com"
                width={80}
                height={80}
                className=" w-20 h-20"
              />
            </div>
            <div className="card-body">
              <div className="flex items-end gap-2">
                <div className="flex flex-col mb-1 text-lg">
                  <p className="relative opacity-80">
                    <span className="absolute bg-base-content h-[0.1em] inset-x-0 top-1/2"></span>
                    <span className="text-base-content">$19.98</span>
                  </p>
                </div>
                <span className="text-5xl tracking-tight font-extrabold">
                  $9.99
                </span>
                <div className="flex flex-col mb-1">
                  <p className="text-xs opacity-60 uppercase font-semibold">
                    USD
                  </p>
                </div>
              </div>

              <p className="text-neutral-500">Great for small teams.</p>

              <button
                className="btn btn-secondary rounded-full my-2"
                onClick={(e) => {
                  e.preventDefault();
                  plausible("SUBSCRIBE_NOW_TEAM");
                  buyProduct("449166");
                }}
              >
                Subscribe now
              </button>

              <h4 className="font-bold text-xl tracking-tight">10 monitors</h4>

              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>1-minute monitoring interval</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>HTTP & ping monitoring</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    100 SMS{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    200 Emails{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    5 phone number{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    5 email address{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-[#fafafa] w-80 shadow-xl text-[#151515] mx-auto lg:mx-0">
            <div className="flex flex-row justify-between items-center pl-8 pr-8 pt-8">
              <h3 className="font-bold text-2xl lg:text-3xl tracking-tight">
                <strong className="relative">Enterprise</strong>
              </h3>
              <Image
                src={"/team.svg"}
                alt="HTTP Website Monitoring - UptimeFriend.com"
                width={80}
                height={80}
                className=" w-20 h-20"
              />
            </div>
            <div className="card-body">
              <div className="flex items-end gap-2">
                <div className="flex flex-col mb-1 text-lg">
                  <p className="relative opacity-80">
                    <span className="absolute bg-base-content h-[0.1em] inset-x-0 top-1/2"></span>
                    <span className="text-base-content">$39.98</span>
                  </p>
                </div>
                <span className="text-5xl tracking-tight font-extrabold">
                  $19.99
                </span>
                <div className="flex flex-col mb-1">
                  <p className="text-xs opacity-60 uppercase font-semibold">
                    USD
                  </p>
                </div>
              </div>

              <p className="text-neutral-500">Best for large organizations.</p>

              <button
                className="btn btn-secondary rounded-full my-2"
                onClick={(e) => {
                  e.preventDefault();
                  plausible("SUBSCRIBE_NOW_ENTERPRISE");
                  buyProduct("449167");
                }}
              >
                Subscribe now
              </button>

              <h4 className="font-bold text-xl tracking-tight">20 monitors</h4>

              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="whitespace-nowrap">
                    1-minute monitoring interval
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>HTTP & ping monitoring</span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    200 SMS{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    500 Emails{" "}
                    <strong className="relative text-secondary">
                      per month
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    10 phone number{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-1 fill-emerald-500 shrink"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    10 email address{" "}
                    <strong className="relative text-secondary">
                      for alerts
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
