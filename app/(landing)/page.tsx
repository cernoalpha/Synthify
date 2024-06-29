import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skull } from 'lucide-react';
import { auth } from "@clerk/nextjs/server";

export default function LandingPage() {
  const user = auth()

  return (
    <div className="landing-page w-screen h-screen text-white text-center bg-cover bg-center bg-fixed flex flex-col justify-between" style={{ backgroundImage: 'url("/background.png")' }}>
      <header className="header flex justify-between items-center p-5">

        <div className="logo flex gap-[1vw] items-center justify-center text-[2vw] font-bold">
          <div className="flex items-center justify-center">
            <Skull className="h-full w-12" />
          </div>
          <div className="flex mt-5 items-center pb-[1.3vw]">Synthify</div>
        </div>

        <nav>
          <ul className="flex justify-around w-[30vw] list-none p-0 m-0">
            <li className="mx-2">
              <a href="" className="text-white no-underline text-[1.2vw]">Main</a>
            </li>
            <li className="mx-2">
              <a href="" className="text-white no-underline text-[1.2vw]">About</a>
            </li>
            <li className="mx-2">
              <a href="" className="text-white no-underline text-[1.2vw]">Contact</a>
            </li>
          </ul>
        </nav>
        {!user.userId ? (
          <Link href="/sign-in">
            <Button className="get-started bg-white text-black rounded-3xl px-4 py-2">Login</Button>
          </Link>

        ) : (
          <Link href="/dashboard">
            <Button className="get-started bg-white text-black rounded-3xl px-4 py-2">Dashboard</Button>
          </Link>
        )
        }
      </header>
      <main className="main-content flex-1 flex flex-col justify-center items-center font-['FoundersGrotesk'] tracking-wide">
        <h1 className="text-[5vw] m-0">THE BEST AI TOOL FOR <br /> PHOTO MUSIC VIDEO AND CODE GEN</h1>
        <p className="text-[3vw] text-zinc-400 m-0">Create content using AI 10x faster</p>
        <div className="start-generating bg-[#A8FF35F5] font-bold rounded-3xl px-[2vw] py-[1vw] mt-[2vw] text-[1.8vw] text-black relative">
          <span className="glow rounded-3xl"></span>
          <a href={!user.userId? "/sign-in": "/dashboard"}>Start Generating For Free </a>
        </div>
      </main>
    </div>
  );
}
