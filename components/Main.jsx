import Image from "next/image";

function Main() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-8 py-10 lg:py-20 gap-16 lg:gap-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center lg:items-start text-center lg:text-left w-full lg:w-2/3">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex justify-center items-center f-w-">
          <span className="whitespace-nowrap relative">Uptime Web Hosting</span>
        </h1>
        <h2 className="text-xl opacity-80 leading-relaxed">
          We monitor your site's uptime & notify you instantly via{" "}
          <span className="relative text-secondary">EMAIL, SMS. </span>
        </h2>

        <button className="btn btn-error text-white btn-wide">
          Get started
        </button>
      </div>

      <div className="hidden lg:block relative max-md:-m-4 lg:w-1/2">
        <Image
          src={"/main.webp"}
          alt="Uptime 24/7 notify via SMS, EMAIL"
          width={1080}
          height={1080}
          className="w-full max-w-xl ml-auto"
          priority={true}
        />
      </div>
    </section>
  );
}

export default Main;
