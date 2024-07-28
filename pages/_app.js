import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlausibleProvider from "next-plausible";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <PlausibleProvider domain="uptimefriend.com">
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SessionProvider>
    </PlausibleProvider>
  );
}
