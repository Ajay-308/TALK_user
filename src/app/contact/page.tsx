"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../home/Navbar";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.defer = true;

    script.onload = () => {
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar />

      <section className="contact -mt-[10rem] h-[55rem] bg-black" id="contact">
        <div
          className={`visme_d ${
            isLoading
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-500 ease-in"
          }`}
          data-title="Untitled Project"
          data-url="jwo841pg-untitled-project?fullPage=true"
          data-domain="forms"
          //data-full-page="true"
          // data-min-height="100vh"
          data-form-id="16940"
        >
          <h1 className="text-3xl font-bold text-white">
            Please touch the screen once and Wait ...
          </h1>
        </div>
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <div className="spinner"></div>
          </div>
        )}
      </section>
    </>
  );
};

export default ContactForm;
