import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "./home/Navbar";

const Home: React.FC = () => {
  const { userId } = auth();

  if (userId) redirect("/home");

  return (
    <div>
      <Navbar />
      <section className="grid h-[94vh]  place-content-center bg-black ">
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
    </div>
  );
};

export default Home;
