import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function sendMessage(prompt) {
        setLoading(true);
        try {
            setMessages((prevMessages) => [...prevMessages, { text: prompt, sender: "user" }]);

            const { data } = await axios.post("/api/ai/chat", { prompt });

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: prompt, sender: "user" },
                { text: data.response, sender: "chatbot" }
            ]);

            toast.success("Response received from chatbot!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to generate response.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <ChatContext.Provider value={{ messages, sendMessage, loading }}>
            {children}
            <Toaster />
        </ChatContext.Provider>
    );
};

export const ChatData = () => useContext(ChatContext);
