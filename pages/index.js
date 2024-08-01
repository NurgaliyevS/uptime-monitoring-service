import Ads from "@/components/Ads";
import Demo from "@/components/Demo";
import DownTime from "@/components/DownTime";
import FAQ from "@/components/FAQ";
import FeaturedOn from "@/components/FeaturedOn";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import TeamMembers from "@/components/TeamMembers";
import { Lato } from "next/font/google";
import Head from "next/head";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Monitor your website, and server | UptimeFriend.com</title>
      </Head>
      <header className={lato.className}>
        <Header />
      </header>
      <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
        <Main />
        <FeaturedOn />
        <Ads />
        <Reviews />
        <TeamMembers />
        <Demo />
        <DownTime />
        <Pricing />
        <FAQ />
      </main>
      <footer className={lato.className}>
        <Footer />
      </footer>
    </>
  );
}
