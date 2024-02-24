"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../home/Navbar";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HiSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { MicIcon } from "lucide-react";
interface ChatMessage {
  user: string;
  jarwis: string;
}
const Learn: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const storedChatHistory = localStorage.getItem("learnchatHistory");
    return storedChatHistory ? JSON.parse(storedChatHistory) : [];
  });
  const msgBoxRef = useRef<HTMLDivElement>(null);
  const [voiceData, setVoiceData] = useState("");
  const [error, setError] = useState("");

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
      speak(response.data.message);
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

  // listen

  const handleListen = async () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceData(transcript);
        setInputMessage(transcript); // Set voice data to the input message
        recognition.stop();

        // Call handleSendMessage to send the voice data as a message
        handleSendMessage();
        handleSubmit();
      };

      recognition.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        recognition.stop();
      };
    } catch (error) {
      setError(`Error: ${error}`);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/listen", {
        message: voiceData,
      });
      console.log(response.data);
    } catch (error) {
      console.error(`Error submitting voice data: ${error}`);
    }
  };

  return (
    <div className="bg-black">
      <Navbar />
      <div className="bg-gradient text-dark flex min-h-screen w-[140vh] flex-col place-content-center  items-center justify-center bg-black lg:w-[100vw] xl:w-[100vw]">
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
                  <div className="text-white">
                    <BotIcon className="m-1 text-white" size={20} />
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
            className="form-control  flex-grow  bg-gray-800 text-white"
            name="message"
            onKeyDown={handleKeyDown}
            placeholder="Type your message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button
            className="ml-4 bg-white text-black  hover:scale-110 hover:bg-white"
            onClick={handleSendMessage}
          >
            Send
          </Button>
          <MicIcon
            className="ml-4 mt-2 h-6 w-6 cursor-pointer rounded bg-white  text-black"
            size={25}
            onClick={() => handleListen()}
          />
        </div>
      </div>
    </div>
  );
};

export default Learn;
