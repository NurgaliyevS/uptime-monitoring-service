import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col min-h-screen mx-auto ${inter.className}`}
    >sad</main>
  );
}
