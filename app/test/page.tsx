"use client";

import React, { useState, useEffect } from "react";

const WebSocketTest: React.FC = () => {
  const [messages, setMessages] = useState(["ข้อความ 1", "ข้อความ 2"]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Establish WebSocket connection
    // Set the handler to receieve message
  }, []);

  // Send message to websocket server
  function sendMessage() {
    // send "message"
  }

  // Receieve message from websocket server
  function receiveMessage() {
    // concat "messages" by new message
    setMessages((prevMessages) => [...prevMessages, "new message"]);
  }

  return (
    <div className="bg-white text-black h-screen p-2">
      <h1 className="font-bold">WebSocket Test</h1>
      <input
        className="border border-black p-1"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button
        className="border border-black rounded p-1 active:opacity-50"
        onClick={sendMessage}
      >
        Send Message
      </button>
      <div className="p-2 flex flex-col gap-1">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketTest;
