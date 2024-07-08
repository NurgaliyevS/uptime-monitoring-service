import Image from "next/image";

function TeamMembers(props) {
  return (
    <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-8 lg:py-20 gap-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-16">
        <div className="relative max-md:-m-4 lg:w-1/2">
          <div className="card bg-white w-full flex items-center justify-center shadow-xl p-10">
            <Image
              src={"/people.webp"}
              alt="Add teammates to your monitors - UptimeFriend.com"
              width={300}
              height={300}
              priority={true}
            />
          </div>
        </div>
        <div className="flex flex-col gap-10 items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          <h2 className="font-bold text-2xl lg:text-5xl tracking-tight">
            <span className="whitespace-wrap relative">
              Add <strong className="relative text-secondary">teammates</strong>{" "}
              to keep them{" "}
              <strong className="relative text-secondary">updated </strong> with
              alerts<strong className="realative text-secondary">.</strong>
            </span>
          </h2>
          <p className="text-xl opacity-80 leading-relaxed">
            Invite team members to your monitors. Keep everyone notified and
            manage issues together.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TeamMembers;
