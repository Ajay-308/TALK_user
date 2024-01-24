"use client";
import React, { useState } from "react";
import axios from "axios";

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

  return (
    <div>
      <div>
        <textarea
          rows={10}
          cols={50}
          value={chatHistory}
          readOnly
          style={{ marginBottom: "10px" }}
        />
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
