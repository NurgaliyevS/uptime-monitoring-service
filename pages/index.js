import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
      <h1 className="text-4xl font-bold text-center">
        Uptime Friend is a simple uptime monitoring service
      </h1>
    </main>
  );
}
