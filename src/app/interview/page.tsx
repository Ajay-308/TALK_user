"use client";
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../home/Navbar";
import { Button } from "@/components/ui/button";

const ChatComponent: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string>("");

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        { message: inputMessage },
        { withCredentials: true }, // Add this option
      );

      setChatHistory(
        (prevHistory) =>
          prevHistory +
          `User: ${inputMessage}\nJarwis: ${response.data.message}\n`,
      );
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      handleSendMessage();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid  bg-gradient text-dark mt-5 flex flex-col items-center justify-center">
        <div className="border-warning border-3 h-[3rem] w-[15rem] rounded shadow">
          <h1 className="  mb-8 ml-4 mt-4"> Interview Prep with AI</h1>
        </div>
        <div className="mt-4 border border-black p-4">
          <div className="border-black p-2">
            <textarea
              rows={17}
              cols={50}
              value={chatHistory}
              readOnly
              className="mb-4 border-black p-2"
            />
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mr-2 border border-black p-2"
            />
            <Button onClick={handleSendMessage} className="p-2">
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
