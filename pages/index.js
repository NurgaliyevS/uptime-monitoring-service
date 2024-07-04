import Header from "@/components/Header";
import Main from "@/components/Main";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
      <Header />
      <Main />
    </main>
  );
}
