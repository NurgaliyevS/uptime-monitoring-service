import AdminLogic from "@/components/AdminLogic";
import withAuth from "@/components/withAuth";
import Head from "next/head";

function Admin() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminLogic />
    </>
  );
}

export default withAuth(Admin);
