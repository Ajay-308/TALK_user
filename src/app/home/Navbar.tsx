import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <>
      <div className="bg-black pt-2 text-2xl text-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo and Talk User on the left */}
          <div className="flex items-center">
            <Link href="/home" className="flex items-center gap-1">
              <Image src={logo} alt="shera logo" className="mr-4 h-10 w-10" />
              <span className="font-bold">Talk User</span>
            </Link>
          </div>
          <div className="flex flex-grow justify-center">
            <Link href="/docs" className="mx-4 font-fantasy">
              <span>Docs</span>
            </Link>
            <Link href="/features" className="mx-4 font-fantasy">
              <span>Features</span>
            </Link>
            <Link href="/careers" className="mx-4 font-fantasy">
              <span>Careers</span>
            </Link>
            <Link href="/contact" className="mx-4 font-fantasy">
              <span>Contact Us</span>
            </Link>
          </div>
          {/* Toggle button and Get Started button on the right */}
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: "2.7rem",
                    height: "2.7rem",
                    marginRight: "2rem",
                  },
                },
              }}
            />
          </div>
          <div>
            <Button className="bg-white text-black hover:scale-110 hover:bg-white">
              <Link href="/home">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
