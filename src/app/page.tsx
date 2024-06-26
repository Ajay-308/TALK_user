import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import first from "../assets/job-interview.gif";
import second from "../assets/resume.gif";
import third from "../assets/home.gif";
import fourth from "../assets/online-learning.gif";
// import LocomotiveScroll from 'locomotive-scroll';
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "./home/Navbar";
import { Card } from "@/components/ui/card";
import Footer from "./home/footer";

const Home: React.FC = () => {
  const { userId } = auth();

  if (userId) redirect("/home");

  return (
    <div>
      <Navbar />
      <section className="grid h-screen w-[140vh] place-content-center bg-black lg:w-screen xl:w-screen">
        <div id="circle-shape">
          <div id="circle1"></div>
          <div id="circle2"></div>
          <div id="circle3"></div>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="ml-2 mt-8 flex">
              <div className="text-xl font-bold text-white">
                Here We are for you, We care you and your English learn
              </div>
            </div>
            <div className="mt-2 text-5xl font-bold text-white">
              Unlock{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Growth
              </span>{" "}
              with Talk User
            </div>
            <div className="mt-2 text-xl font-semibold text-blue-400">
              Begin your journey with us
            </div>

            <Button className="ml-4 mt-2 rounded-full bg-white text-black hover:bg-white">
              <Link className="font-bold" href="/home">
                Get Started
              </Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </div>
        </div>
      </section>
      <section className="flex w-[140vh] place-content-center justify-center bg-black text-white lg:w-screen xl:w-screen">
        <div className="mt-24 grid grid-cols-2 grid-rows-2 items-center justify-center gap-4 bg-black">
          {/* Card 1 */}
          <Card className="flex flex-col items-center border bg-black p-4 text-white lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={third} alt="Home" className="h-[12rem] w-[12rem] rounded" />
            </div>
            <div className="mt-4 text-center">How to use</div>
            <Button className="mt-12 bg-white text-black hover:bg-white">
              <Link href="/home">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>

          {/* Card 2 */}
          <Card className="flex flex-col items-center border bg-black p-4 text-white lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={second} alt="Resume Tracker" className="h-[12rem] w-[12rem] rounded" />
            </div>
            <div className="mt-4 text-center">ResumeTracker</div>
            <Button className="mt-12 bg-white text-black hover:bg-white">
              <Link href="/role">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>

          {/* Card 3 */}
          <Card className="flex flex-col items-center border bg-black p-4 text-white lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={first} alt="Interview" className="h-[12rem] w-[12rem] rounded" />
            </div>
            <div className="mt-4 text-center">Interview</div>
            <Button className="mt-12 bg-white text-black hover:bg-white">
              <Link href="/interview">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>

          {/* Card 4 */}
          <Card className="flex flex-col items-center border bg-black p-4 text-white lg:h-[24rem] lg:w-[20rem]">
            <div className="flex items-center justify-center">
              <Image src={fourth} alt="Online Learning" className="h-[12rem] w-[12rem] rounded" />
            </div>
            <div className="mt-4 text-center">Learn</div>
            <Button className="mt-12 bg-white text-black hover:bg-white">
              <Link href="/learn">Get Started</Link>
              <ArrowRight className="w-h ml-2 h-4 w-6 ease-in-out hover:h-6" />
            </Button>
          </Card>
        </div>
      </section>
      <section className="h-[10rem] w-screen bg-black" />
      <section className="h-[10rem] w-screen bg-black text-white">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
