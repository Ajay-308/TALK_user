"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../home/Navbar";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  user: string;
  jarwis: string;
}
const Learn: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const storedChatHistory = localStorage.getItem("learnchatHistory");
    return storedChatHistory ? JSON.parse(storedChatHistory) : [];
  });
  const msgBoxRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/role",
        { message: inputMessage },
        { withCredentials: true },
      );

      const newMessage: ChatMessage = {
        user: inputMessage,
        jarwis: response.data.message,
      };

      setChatHistory((prevHistory) => [...prevHistory, newMessage]);

      localStorage.setItem(
        "learnchatHistory",
        JSON.stringify([...chatHistory, newMessage]),
      );

      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-gradient text-dark flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-warning -mt-24 mb-2 ml-2 mr-auto font-fantasy text-xl font-bold">
          learn english with AI
        </h1>
        <div
          className="bg-light mb-4 h-[33rem] w-[70rem] overflow-y-scroll rounded border p-3"
          ref={msgBoxRef}
        >
          {chatHistory.map((msg, index) => (
            <div key={index} className={`row justify-content-start pl-5`}>
              <div
                className="d-flex flex-column ml-auto rounded border bg-white p-2 text-black shadow"
                style={{
                  width: "fit-content",
                  minWidth: "8rem",
                  maxWidth: "30rem",
                }}
              >
                <div>
                  <strong className="m-1">user</strong>
                </div>
                <h4 className="m-1">{msg.user}</h4>
              </div>

              <div className="row justify-content-end pl-5">
                <div
                  className="d-flex flex-column bg-info w-rounded my-4 -ml-8 mr-auto border p-2 shadow"
                  style={{
                    width: "fit-content",
                    minWidth: "20rem",
                    maxWidth: "55rem",
                  }}
                >
                  <div>
                    <BotIcon className="m-1" size={20} />
                    <strong className="m-1">Jarwis</strong>
                  </div>
                  <h4 className="m-1">{msg.jarwis}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="form-group border-5 flex w-[35rem]">
          <Input
            type="text"
            className="form-control bg-light flex-grow "
            name="message"
            onKeyDown={handleKeyDown}
            placeholder="Type your message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button className="ml-4" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default Learn;
