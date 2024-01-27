"use client";

import logo from "@/assets/logo.png";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <>
      <div className="p-2 shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo and Talk User on the left */}
          <div className="flex items-center">
            <Link href="/home" className="flex items-center gap-1">
              <Image src={logo} alt="shera logo" className="mr-4 h-10 w-10" />
              <span className="font-bold">Talk User</span>
            </Link>
            {/* Other links if any */}
          </div>
          {/* Center aligned links */}
          <div className="flex flex-grow justify-center">
            <Link href="/docs" className="mx-4 font-fantasy">
              <span>Docs</span>
            </Link>
            <Link href="/blog" className="mx-4 font-fantasy">
              <span>Blog</span>
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
          <div className="flex items-center">
            <ThemeToggleButton />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "light" ? dark : undefined,
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <Button className="ml-4">
              <Link href="/home">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
