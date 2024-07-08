import Image from "next/image";

function DownTime() {
  return (
    <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-8 lg:py-20 gap-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-16">
        <div className="relative w-80 lg:w-1/2">
          <div className="card bg-white w-full flex shadow-xl p-10 flex-row">
            <div className="flex flex-col w-1/2 items-center">
              {" "}
              <Image
                src={"/email.svg"}
                alt="Get notified via Email - UptimeFriend.com"
                width={48}
                height={48}
                priority={true}
                className="w-12 h-12 flex justify-center items-center text-center"
              />
              <span className="flex justify-center items-center">Email</span>
            </div>
            <div className="flex flex-col w-1/2 items-center">
              {" "}
              <Image
                src={"/phone.svg"}
                alt="Get notified via SMS - UptimeFriend.com"
                width={48}
                height={48}
                priority={true}
                className="w-12 h-12 flex justify-center items-center"
              />
              <span className="flex justify-center items-center">SMS</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <h2 className="font-bold text-2xl lg:text-5xl tracking-tight">
            <span className="whitespace-wrap relative">
              Always <strong className="relative text-secondary">know</strong>{" "}
              about{" "}
              <strong className="relative text-secondary">downtime</strong>.
            </span>
          </h2>
          <p className="text-xl opacity-80 leading-relaxed">
            Even the best sites go down. Know before your customers do!
            <br />
            Get notified via email and SMS.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DownTime;
