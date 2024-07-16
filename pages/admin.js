import AdminLogic from "@/components/AdminLogic";
import withAuth from "@/components/withAuth";
import Head from "next/head";

function Admin() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="bg-slate-800 text-base-300">
        <AdminLogic />
      </div>
    </>
  );
}

export default withAuth(Admin);
