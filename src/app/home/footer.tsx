"use client";
import { Instagram, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="ml-4 bg-black">
      <div className="wave1" id="wave"></div>
      <div className="wave2" id="wave"></div>
      <div className="wave3" id="wave"></div>
      <div className="wave4" id="wave"></div>
      <div className="footer flex items-center justify-center gap-8">
        <a
          href="YOUR_INSTAGRAM_a"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[8rem] cursor-pointer"
        >
          <Instagram size={24} />
        </a>
        <a
          href="YOUR_GITHUB_a"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[8rem] cursor-pointer"
        >
          <GithubIcon size={24} />
        </a>
        <a
          href="YOUR_aEDIN_a"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[8rem] cursor-pointer"
        >
          <LinkedinIcon size={24} />
        </a>
        <a
          href="mailto:gojoxsukuna3@gmail.com"
          className="mt-[8rem] cursor-pointer"
        >
          <MailIcon size={24} />
        </a>
      </div>
      <style jsx>{`
        .footer {
          background: linear-gradient(
            180deg,
            rgba(70, 70, 255, 0.8) 0%,
            rgba(70, 70, 255, 0.5) 50%,
            rgba(70, 70, 255, 0.8) 100%
          );
          height: 20rem;
          border-radius: 10px;
          padding: 1rem;
        }

        .footer a {
          margin-bottom: 15rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: white;
          text-decoration: none;
          transition: 0.5s;
        }

        .footer a:hover {
          text-decoration: underline;
          color: black;
          transform: translateY(-10px);
        }
        .footer .wave {
          position: absolute;
          top: -1opx;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(70, 70, 255, 0.8);
          background-size: 1000px 100px;
        }
        .footer .wave #wave1 {
          z-index: 1000;
          opacity: 1;
          bottom: 0;
          animation: animateWave 4s linear infinite;
        }
        .footer .wave #wave2 {
          z-index: 1000;
          opacity: 0.5;
          bottom: 0;
          animation: animateWave-02 4s linear infinite;
        }
        .footer .wave #wave3 {
          z-index: 1000;
          opacity: 0.2;
          bottom: 0;
          animation: animateWave-02 4s linear infinite;
        }
        .footer .wave #wave4 {
          z-index: 1000;
          opacity: 0.7;
          bottom: 0;
          animation: animateWave-02 4s linear infinite;
        }
        @keyframes animateWave {
          0% {
            background-position: 100%;
          }
          100% {
            background-position: 0%;
          }
        }
        @keyframes animateWave-02 {
          0% {
            background-position: 100%;
          }
          100% {
            background-position: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
