import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import first from "../../assets/job-interview.gif";
import second from "../../assets/resume.gif";
import thrird from "../../assets/home.gif";
import fourth from "../../assets/online-learning.gif";
import Footer from "./footer";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Talk User",
};

export default async function NotesPage() {
  const { userId } = auth();

  if (!userId) throw Error("userId undefined");

  return (
    <>
      <section className="grid h-screen w-[140vh] place-content-center bg-black lg:w-screen xl:w-screen">
        <div id="circle-shape">
          <div id="circle1"></div>
          <div id="circle2"></div>
          <div id="circle3"></div>
        </div>
        <div className="w- flex">
          <div className="flex flex-col items-center justify-center">
            <div className="ml-2 mt-8 flex">
              <div className="text-xl font-bold text-white ">
                Here We are for you, We care you and your English learn
              </div>
            </div>
            <div className="mt-2 text-5xl font-bold text-white ">
              Unlock{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Growth
              </span>{" "}
              with Talk User
            </div>
            <div className="mt-2 text-xl font-semibold text-blue-400">
              {" "}
              Begin your journey with us
            </div>
            <Button className="hover:bg-whitetransform ml-4 mt-2 rounded-full bg-white text-black hover:scale-110 ">
              <Link className="font-bold " href="/home">
                Get Started
              </Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </div>
        </div>
      </section>
      <section className="flex w-[140vh] justify-center bg-black font-fantasy text-2xl text-white lg:w-screen xl:w-screen">
        <div className="mt-48 grid grid-cols-2 grid-rows-2 items-center justify-center gap-4 bg-black">
          {/* Card 1 */}
          <Card className="flex flex-col items-center border bg-black p-4 text-white   lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image
                src={thrird}
                alt="src"
                className="m-1 h-[12rem] w-[12rem] rounded "
              />
            </div>
            <div className="mt-4 text-center">How to use</div>
            <Button className="mt-12  bg-white text-black hover:bg-white">
              <Link href="/home">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>

          {/* Card 2 */}
          <Card className="flex flex-col items-center border bg-black p-4 text-white  lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image
                src={second}
                alt="src"
                className="m-1 h-[12rem] w-[12rem] rounded "
              />
            </div>
            <div className="mt-4 text-center">ResumeTracker</div>
            <Button className="mt-12  bg-white text-black hover:bg-white">
              <Link href="/resume">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>

          {/* Card 3 */}
          <Card className="flex flex-col items-center border bg-black p-4 text-white  lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image
                src={first}
                alt="src"
                className="m-1 h-[12rem] w-[12rem] rounded "
              />
            </div>
            <div className="mt-4 text-center">interview</div>
            <Button className="mt-12  bg-white text-black hover:bg-white">
              <Link href="/interview">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>

          {/* Card 4 */}
          <Card className="flex flex-col items-center  border bg-black p-4 text-white lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image
                src={fourth}
                alt="src"
                className="m-1 h-[12rem] w-[12rem] rounded"
              />
            </div>
            <div className="mt-4 text-center">learn</div>
            <Button className="mt-12 bg-white text-black hover:bg-white">
              <Link href="/learn">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>
        </div>
      </section>
      <section className="h-[10rem] w-screen bg-black" />
      <section className=" h-[10rem] w-screen bg-black text-white">
        <div className="">
          <Footer />
        </div>
      </section>
    </>
  );
}
