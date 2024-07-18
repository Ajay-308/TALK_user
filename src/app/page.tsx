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
import { PinContainer } from "@/components/ui/3d-pin";

const Home: React.FC = () => {
  const { userId } = auth();

  if (userId) redirect("/home");

  return (
    <div>
      <Navbar />
      <section className="grid h-screen  place-content-center bg-black ">
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
      <section className="flex place-content-center justify-center bg-black text-white ">
        <div className="mt-24 grid grid-cols-2 grid-rows-2 items-center justify-center gap-4 bg-black">
          <PinContainer
            title="Docs"
            href="https://github.com/Ajay-308/TALK_user"
          >
            <div className="flex h-[16rem] w-[20rem] basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:h-[22rem] lg:w-[20rem] ">
              <Image
                src={second}
                alt="interview"
                className="ml-12 h-[12rem] w-[12rem] rounded"
              />
              <h3 className=" ml-24 mt-8 max-w-xs !pb-2 text-base  font-bold text-slate-100">
                Docs
              </h3>
              <div className="mt-4 !p-0 text-base font-normal">
                <span className="font-bold text-slate-500 ">
                  Read the Document to know about more
                </span>
              </div>
            </div>
          </PinContainer>

          <PinContainer title="Resume Tracker" href="/Resume">
            <div className="flex h-[16rem] w-[20rem] basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:h-[22rem] lg:w-[20rem] ">
              <Image
                src={fourth}
                alt="interview"
                className="ml-12 h-[12rem] w-[12rem] rounded"
              />
              <h3 className=" ml-24 mt-8 max-w-xs !pb-2 text-base  font-bold text-slate-100">
                Resume Tracker
              </h3>
              <div className="mt-4 !p-0 text-base font-normal">
                <span className="font-bold text-slate-500 ">
                  Track your resume and find the best fit job
                </span>
              </div>
            </div>
          </PinContainer>

          <PinContainer title="Interview" href="/interview">
            <div className="flex h-[16rem] w-[20rem] basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:h-[22rem] lg:w-[20rem] ">
              <Image
                src={third}
                alt="interview"
                className="ml-12 h-[12rem] w-[12rem] rounded"
              />
              <h3 className=" ml-24 mt-8 max-w-xs !pb-2 text-base  font-bold text-slate-100">
                Interview
              </h3>
              <div className="mt-4 !p-0 text-base font-normal">
                <span className="font-bold text-slate-500 ">
                  Embrace your interview skills with us
                </span>
              </div>
            </div>
          </PinContainer>
          <PinContainer title="Learn" href="/learn">
            <div className=" flex h-[16rem] w-[20rem] basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:h-[22rem] lg:w-[20rem] ">
              <Image
                src={first}
                alt="interview"
                className="ml-12 h-[12rem] w-[12rem] rounded"
              />
              <h3 className=" ml-24 mt-8 max-w-xs !pb-2 text-base  font-bold text-slate-100">
                Learn
              </h3>
              <div className="mt-4 !p-0 text-base font-normal">
                <span className="font-bold text-slate-500 ">
                  Learning is the key to success
                </span>
              </div>
            </div>
          </PinContainer>
        </div>
      </section>
      <section className="h-[10rem] bg-black" />
      <section className="h-[10rem]  bg-black text-white">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
