import withAuth from "@/components/withAuth";
import Head from "next/head";

function Admin() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div>
        Admin Page
      </div>
    </>
  );
}

export default withAuth(Admin);
