import React, { useState, useEffect, useRef } from "react";
import { ChatData } from "../context/ChatContext";
import { UserData } from "../context/UserContext";

const Chatbot = () => {
  const { user } = UserData();
  const { messages, sendMessage, loading } = ChatData();
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  // Scroll to the bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-50 max-w-md mx-auto my-10 p-4 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${
              message.sender === "user" ? "chat-end ml-auto" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full border">
                <img
                  // Conditionally show the user profile picture or the AI profile picture
                  src={
                    message.sender === "user"
                      ? user?.profilePicture?.url || "/user-avatar.png" // User profile picture or fallback
                      : "/ai-avatar.png" // AI's profile picture (replace with your bot's avatar URL)
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{/* Format timestamp if needed */}</time>
            </div>
            <div
              className={`chat-bubble flex flex-col ${
                message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div> {/* Scroll reference */}
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
