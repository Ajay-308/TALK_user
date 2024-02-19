"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../home/Navbar";
import { Button } from "@/components/ui/button";
import { BotIcon, MicIcon, SpeakerIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HiSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
interface ChatMessage {
  user: string;
  jarwis: string;
}

const ChatComponent: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    // local storage se history leke storedchathistory me daal lega
    const storedChatHistory = localStorage.getItem("chatHistory");
    return storedChatHistory ? JSON.parse(storedChatHistory) : [];
  });
  const msgBoxRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        { message: inputMessage },
        { withCredentials: true },
      );

      const newMessage: ChatMessage = {
        user: inputMessage,
        jarwis: response.data.message,
      };

      setChatHistory((prevHistory) => [...prevHistory, newMessage]);

      // Store updated chat history in local storage
      localStorage.setItem(
        "chatHistory",
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
    // Scroll to the bottom when chatHistory changes
    if (msgBoxRef.current) {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  //text to speech

  const speak = async (text: string) => {
    const url = "https://joj-text-to-speech.p.rapidapi.com/";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "e52465886amsh8c5f506411e78aap1a949ajsn8f5abf05fd02",
        "X-RapidAPI-Host": "joj-text-to-speech.p.rapidapi.com",
      },
      body: JSON.stringify({
        input: {
          text: text,
        },
        voice: {
          languageCode: "en-US",
          name: "en-US-News-L",
          ssmlGender: "FEMALE",
        },
        audioConfig: {
          audioEncoding: "MP3",
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Assuming the response is JSON
      console.log(result);

      // Check if the response contains an audio URL
      if (result && result.audioContent) {
        setAudioUrl(`data:audio/mp3;base64,${result.audioContent}`);
      } else {
        console.error("Failed to get audio content from the API response.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl]);
  return (
    <div className="bg-black">
      <Navbar />
      <div className="container-fluid bg-gradient text-dark flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-warning -mt-24 mb-2 mr-auto font-fantasy text-xl font-bold">
          Interview Prep with AI
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
                  <div className="text-white">
                    <BotIcon className="m-1" size={20} />
                    <strong className="m-1">Jarwis</strong>
                  </div>
                  <h4 className="m-1 text-white">{msg.jarwis}</h4>
                  <HiSpeakerWave
                    className="m-1 font-bold text-white"
                    size={20}
                    onClick={() => speak(msg.jarwis)}
                  />
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
          {/* <MicIcon
            className="ml-4 text-white"
            size={20}
            onClick={() => traslate(inputMessage)}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
