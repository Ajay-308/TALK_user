import React from "react";
import { Instagram, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-black p-4 text-white">
      <div className="flex items-center justify-center gap-8">
        <a
          href="YOUR_INSTAGRAM_URL"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://github.com/Ajay-308/TALK_user"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <GithubIcon size={24} />
        </a>
        <a
          href="YOUR_LINKEDIN_URL"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <LinkedinIcon size={24} />
        </a>
        <a href="mailto:mr.ajaykumar308@gmail.com" className="cursor-pointer">
          <MailIcon size={24} />
        </a>
      </div>
      <div className="mt-4 text-center">
        © 2024 Bam Bhole. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
