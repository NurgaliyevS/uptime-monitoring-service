import Monitors from "@/components/Monitors";
import withAuth from "@/components/withAuth";
import Head from "next/head";

function Admin() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="bg-slate-800 text-base-300">
        <Monitors />
      </div>
    </>
  );
}

export default withAuth(Admin);
