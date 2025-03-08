import React, { useState } from "react";
import { ChatData } from "../context/ChatContext";

const Chatbot = () => {
  const { messages, sendMessage, loading } = ChatData();
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-4 bg-white rounded-lg shadow-lg">
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${
              message.sender === "user" ? "chat-end ml-auto" : "chat-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-primary ml-2"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
