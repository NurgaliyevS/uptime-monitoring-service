import Image from "next/image";

function Reviews() {
  return (
    <section
      className="bg-slate-800 text-gray-300 py-44 px-6 flex flex-col overflow-hidden"
      id="reviews"
    >
      <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 justify-between">
        <div className="card bg-[#fafafa] w-80 shadow-xl text-[#151515] mx-auto lg:mx-14">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <Image
                src={"/tdk.svg"}
                alt="aitdk company name"
                width={64}
                height={64}
                className="rounded-full"
              />
              <a
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="link link-hover"
                href="https://aitdk.com/"
              >
                <p className="text-lg">AITDK Company</p>
                <p className="text-neutral-500">SEO Extension</p>
              </a>
            </div>
            <div className="divider"></div>
            <span className="leading-relaxed">
              We've all been there with tricky{" "}
              <strong className="text-secondary">monitoring tools</strong> that
              make our heads spin. Love the{" "}
              <strong className="text-secondary">simplicity</strong> of this
              tool!
            </span>
          </div>
        </div>

        <div className="card bg-[#fafafa] w-80 shadow-xl text-[#151515] mx-auto lg:mx-14">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <Image
                src={"/AleksanderBrousseau.webp"}
                alt="aitdk company name"
                width={64}
                height={64}
                className="rounded-full"
              />
              {/* <a
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="link link-hover"
                // href="https://aitdk.com/"
              > */}
              <div>
                <p className="text-lg whitespace-nowrap">
                  Aleksander Brousseau{" "}
                </p>
                <p className="text-neutral-500">Startup Mentor</p>
              </div>
              {/* </a> */}
            </div>
            <div className="divider"></div>
            <span className="leading-relaxed">
              1-minute monitoring interval for the{" "}
              <strong className="text-secondary">Team and Enterprise </strong>{" "}
              plans is impressive.
            </span>
          </div>
        </div>

        <div className="card bg-[#fafafa] w-80 shadow-xl text-[#151515] mx-auto lg:mx-14">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <Image
                src={"/MarkManson.webp"}
                alt="Mark Manson software engineer"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <p className="text-lg whitespace-nowrap">Mark Manson</p>
                <p className="text-neutral-500">Software Engineer</p>
              </div>
            </div>
            <div className="divider"></div>
            <span className="leading-relaxed">
              Finally some app that can <strong className="text-secondary">fix </strong> my problem.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
