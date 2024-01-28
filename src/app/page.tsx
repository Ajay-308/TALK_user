import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import first from "../assets/1st-removebg-preview.png";
import second from "../assets/2nd-removebg-preview.png";
import thrird from "../assets/Screenshot_2024-01-24_125606-removebg-preview.png";
import fourth from "../assets/4th-removebg-preview.png";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "./home/Navbar";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/home");

  return (
    <div>
      <Navbar />
      <section className="mt-12">
        <div className="flex w-full">
          <div className="flex w-1/2 flex-col items-center justify-center">
            <div className="ml-2 mt-8 flex">
              <div className="text-2xl font-bold">
                Here We are for you, We care you and your English learn
              </div>
            </div>
            <div className="text-xl font-semibold text-blue-400">
              {" "}
              Begin your journey with us
              <Button className="ml-4 mt-4 transform transition-transform duration-300 ease-out hover:translate-y-1">
                <Link href="/home">Get Started</Link>
                <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2">
            <Image
              src={first}
              alt="first"
              className="ml-12 h-[16rem] w-[16rem]"
            />
            <Image
              src={second}
              alt="second"
              className="ml-8 h-[16rem] w-[16rem]"
            />
            <Image
              src={thrird}
              alt="second"
              className=" ml-8 h-[16rem] w-[16rem]"
            />
            <Image
              src={fourth}
              alt="second"
              className="ml-8 h-[16rem] w-[16rem]"
            />
          </div>
        </div>
      </section>
      <div className="absolute left-[0px] mt-28 h-1 w-full " />

      <section className="mb-8 mt-48 flex justify-center">
        <div className="grid grid-cols-2 grid-rows-2 items-center justify-center gap-4">
          {/* Card 1 */}
          <Card className="flex flex-col items-center border p-4 transition-all duration-300 ease-out hover:scale-110 hover:transform  lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={first} alt="src" className="h-[12rem] w-[12rem] " />
            </div>
            <div className="mt-4 text-center">hello</div>
            <Button className="mt-2">
              <Link href="/home">Get Started</Link>
            </Button>
          </Card>

          {/* Card 2 */}
          <Card className="flex flex-col items-center border p-4 transition-all duration-300 ease-out hover:scale-110 hover:transform  lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={first} alt="src" className="h-[12rem] w-[12rem] " />
            </div>
            <div className="mt-4 text-center">ResumeTracker</div>
            <Button className="mt-2">
              <Link href="/role">Get Started</Link>
            </Button>
          </Card>

          {/* Card 3 */}
          <Card className="flex flex-col items-center border p-4 transition-all duration-300 ease-out hover:scale-110 hover:transform  lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={first} alt="src" className="h-[12rem] w-[12rem] " />
            </div>
            <div className="mt-4 text-center">interview</div>
            <Button className="mt-2">
              <Link href="/interview">Get Started</Link>
            </Button>
          </Card>

          {/* Card 4 */}
          <Card className="flex flex-col items-center border p-4 transition-all duration-300 ease-out hover:scale-110 hover:transform  lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={first} alt="src" className="h-[12rem] w-[12rem] " />
            </div>
            <div className="mt-4 text-center">learn</div>
            <Button className="mt-2">
              <Link href="/learn">Get Started</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
