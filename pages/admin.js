import withAuth from "@/components/withAuth";
import Head from "next/head";

function Admin() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Under Construction</h1>
          <p className="text-gray-600">We are currently working on this page. Please check back later.</p>
        </div>
      </div>
    </>
  );
}


export default withAuth(Admin);
