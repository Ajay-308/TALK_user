import logo from "@/assets/logo-removebg-preview.png";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "./home/Navbar";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/home");

  return (
    <>
      <Navbar />
      <main className="flex h-screen flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="shera logo" width={100} height={100} />
          <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Talk User
          </span>
        </div>
        <p className="max-w-prose text-center">
          Intelligent note-taking app built with OpenAI, Pinecone, Next.js, and
          authenticated with Clerk.
        </p>
        <Button size="lg" asChild>
          <Link href="/home">Get Started</Link>
        </Button>
      </main>
    </>
  );
}
