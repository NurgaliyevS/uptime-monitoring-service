import Image from "next/image";

function Ads() {
  return (
    <section className="bg-slate-800 text-gray-300 py-44 flex flex-col overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-center px-10 text-center mb-20">
          <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
            Everything you{" "}
            <strong className="relative text-secondary">need</strong> to know,{" "}
            <br />
            <strong className="relative text-secondary">monitored </strong>
            in one place.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="card bg-[#fafafa] w-80 lg:w-1/2 shadow-xl text-[#151515] mx-auto lg:mx-0">
            <Image
              src={"/http.svg"}
              alt="HTTP Website Monitoring - UptimeFriend.com"
              width={150}
              height={150}
              className="w-30 h-30 pl-8 pt-8"
            />
            <div className="card-body">
              <h3 className="card-title font-extrabold text-xl lg:text-2xl tracking-tight">
                Website monitoring
              </h3>
              <p className="text-lg text-neutral-500">
                Know instantly when your website goes down! Our monitoring
                alerts you before any major issues, helping you avoid downtime
                and save money.
              </p>
              <div className="card-actions">
                <button className="btn bg-[#fafafa] shadow-xl rounded-3xl w-48">
                  Website monitoring
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-[#fafafa] w-80 lg:w-1/2 shadow-xl text-[#151515] mx-auto lg:mx-0">
            <Image
              src={"/networkSwitch.svg"}
              alt="Ping Monitoring - UptimeFriend.com"
              width={150}
              height={150}
              className="w-30 h-30 pl-8 pt-8"
            />
            <div className="card-body">
              <h3 className="card-title font-extrabold text-xl lg:text-2xl tracking-tight">
                Ping monitoring
              </h3>
              <p className="text-lg text-neutral-500">
                Stay ahead of network issues with our simple and reliable tool.
                It checks the availability of your network devices.
              </p>
              <div className="card-actions">
                <button className="btn bg-[#fafafa] shadow-xl rounded-3xl w-48">
                  Ping monitoring
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-20">
          <button className="btn btn-secondary btn-wide">Get started</button>
        </div>
      </div>
    </section>
  );
}

export default Ads;
