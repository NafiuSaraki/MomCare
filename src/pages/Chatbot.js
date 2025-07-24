import React, { useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import knowledgeBase from "../data/knowledgeBase.json";
import { FaHome, FaLightbulb, FaRobot, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [form, setForm] = useState({ input: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ input: e.target.value });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.input.trim()) return;

    setIsLoading(true); // Start loading

    const newChat = [...chat, { type: "user", message: form.input }];
    setChat(newChat);

    try {
      const res = await axios.post("https://momcare-lkmi.onrender.com/get_response", form);
      setChat([
        ...newChat,
        { type: "bot", message: res.data.response },
      ]);
      setForm({ input: "" });
      setIsSuccess(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "An samu kuskure");
      setIsSuccess(false);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const fuse = new Fuse(knowledgeBase, {
    keys: ["question", "keywords"],
    threshold: 0.5,
    includeScore: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md py-4 px-6 flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-green-700">
          UwaLafiya Chatbot
        </h1>
      </header>

      {/* Chat Section */}
      <main className="flex flex-col flex-grow px-4 md:px-10 lg:px-32 py-6 space-y-4">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto bg-white rounded-xl shadow-inner border p-4 sm:p-6 space-y-3 max-h-[60vh]">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] w-fit px-4 py-3 rounded-2xl shadow-sm text-sm md:text-base ${
                msg.type === "user"
                  ? "ml-auto bg-blue-100 text-right"
                  : "mr-auto bg-green-100"
              }`}
            >
              {msg.message}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="text-green-600 text-sm animate-pulse">
              🤖 Bot is typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-stretch gap-2"
        >
          <input
            type="text"
            value={form.input}
            onChange={handleChange}
            placeholder="Rubuta tambayarka..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border rounded-xl outline-none shadow-sm focus:ring-2 focus:ring-green-400 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white px-6 py-3 rounded-xl transition shadow-sm ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Ana Aiki..." : "Aika"}
          </button>
        </form>

        {isSuccess === false && (
          <p className="text-red-600 text-sm">{message}</p>
        )}
      </main>

      {/* Bottom Navigation - Hidden on md and above */}
      <nav className="fixed bottom-0 w-full bg-white shadow-md border-t py-2 flex justify-around z-50 md:hidden">
        <NavButton icon={<FaHome size={20} />} label="Dashboard" onClick={() => navigate("/dashboard")} />
        <NavButton icon={<FaLightbulb size={20} />} label="Shawara" onClick={() => navigate("/tips")} />
        <NavButton icon={<FaRobot size={20} />} label="Chatbot" onClick={() => navigate("/chatbot")} />
        <NavButton icon={<FaUser size={20} />} label="Bayanan Ki" onClick={() => navigate("/profile")} />
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center text-green-700 text-sm">
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

export default Chatbot;
