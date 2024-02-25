import React from "react";
import Navbar from "../home/Navbar";

export default async function Page() {
  return (
    <div>
      <Navbar />
      <div className=" h-screen w-screen bg-black">
        <iframe
          width="640"
          height="360"
          src="https://www.youtube.com/embed/Ej-rpXs3yz0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
