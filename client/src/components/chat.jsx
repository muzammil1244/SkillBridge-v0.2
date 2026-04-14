import { AttachmentIcon, File02Icon, Menu01Icon, SentIcon, Cancel01Icon } from "hugeicons-react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { io } from "socket.io-client";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [getconversationId, setConversationId] = useState("");
  const [getsocket, setsocket] = useState(null);
  const [fileName, setFileName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const senderId = location.state?.senderId;
  const reciverId = location.state?.reciverId;
  const conversationId = location.state?.conversationId;
  const messageref = useRef(null);

  const isReceiverSelected = receiver?.user || receiver?.default;

  useEffect(() => {
    const socketInstance = io(`${import.meta.env.VITE_API_URL}`);
    setsocket(socketInstance);
    if (senderId) socketInstance.emit("addUser", senderId);
    socketInstance.on("getMessage", (data) => {
      setMessages((prev) => [...prev, {
        Messages: data.message,
        user: { id: data.senderId },
        fileUrl: data.file
      }]);
    });
    return () => socketInstance.disconnect();
  }, []);

  useEffect(() => {
    messageref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => { setReceiver({ default: reciverId }); }, []);
  useEffect(() => { if (conversationId) setConversationId(conversationId); }, [conversationId]);
  useEffect(() => { fetchConversation(); }, []);

  const fetchConversation = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/conversation/list/${senderId}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setConversation(data);
    } catch (err) {}
  };

  const fetchMessage = async (conversationId, user) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/message/${conversationId}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data);
      setConversationId(conversationId);
      setReceiver(user);
      setSidebarOpen(false);
    } catch (err) {}
  };

  const sendMessage = async () => {
    if (!isReceiverSelected) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("conversationId", getconversationId || "new");
    formData.append("senderId", senderId);
    formData.append("message", input);
    formData.append("reciverId", reciverId?.freelancerId || receiver?.user?.reciverId || receiver?.default?._id);
    if (file) formData.append("file", file);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/message`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        getsocket?.emit("sendMessage", {
          conversationId: getconversationId || "new",
          senderId,
          message: input,
          reciverId: reciverId?.freelancerId || receiver?.user?.reciverId || receiver?.default?._id,
          file: result.file || ""
        });
        setInput("");
        setFile(null);
        setFileName("");
      }
    } catch (err) {}
  };

  return (
    <div
      data-theme={location.state?.themtrue ? "dark" : ""}
      className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-gray-50 dark:bg-bg-dark"
    >

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-72
        bg-white dark:bg-bg-dark
        border-r border-gray-100 dark:border-border-color
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-[280px] md:flex md:flex-col
        overflow-hidden
      `}>

        {/* Sidebar Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-border-color flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold">
              <span className="text-purple-500 dark:text-white">Skill</span>
              <span className="text-blue-900 dark:text-accent-color">Bridge</span>
            </h1>
            <p className="text-[10px] text-gray-400 dark:text-secondary-text-color mt-0.5">Messages</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden w-7 h-7 rounded-lg bg-gray-100 dark:bg-card-color flex items-center justify-center text-gray-500"
          >
            <Cancel01Icon size={13} />
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto py-2 px-2">
          {conversation.length > 0 ? conversation.map((item) => (
            <div
              key={item.conversationId}
              onClick={() => fetchMessage(item.conversationId, item)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer mb-1 transition-colors
                ${getconversationId === item.conversationId
                  ? "bg-purple-50 dark:bg-purple-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-card-color"
                }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-xl object-cover"
                  src={item.user.image}
                  alt={item.user.name}
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white dark:border-bg-dark" />
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className={`text-[13px] font-semibold truncate ${getconversationId === item.conversationId ? "text-purple-600 dark:text-accent-color" : "text-gray-800 dark:text-text-color"}`}>
                  {item.user.name}
                </h1>
                <p className="text-[11px] text-gray-400 dark:text-secondary-text-color truncate">{item.user.email}</p>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center h-40 gap-2">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-card-color flex items-center justify-center">
                <SentIcon className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-xs text-gray-400 dark:text-secondary-text-color">No conversations yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Nav — mobile */}
        <div className="md:hidden px-4 py-3 bg-white dark:bg-bg-dark border-b border-gray-100 dark:border-border-color flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-card-color flex items-center justify-center"
          >
            <Menu01Icon className="w-4 h-4 text-gray-600 dark:text-text-color" />
          </button>
          <h1 className="text-sm font-semibold text-gray-700 dark:text-text-color">
            {isReceiverSelected
              ? (receiver.user?.name || receiver.default?.name)
              : "Select a chat"
            }
          </h1>
        </div>

        {/* Receiver Header */}
        <AnimatePresence>
          {isReceiverSelected && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-3 px-5 py-3 bg-white dark:bg-bg-dark border-b border-gray-100 dark:border-border-color"
            >
              <div className="relative">
                <img
                  className="w-9 h-9 rounded-xl object-cover"
                  src={`https://skillbridge-x62a.onrender.com/uploads/${receiver.user?.image || receiver.default?.profileImage}`}
                  alt=""
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white dark:border-bg-dark" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-800 dark:text-text-color">
                  {receiver.user?.name || receiver.default?.name}
                </h1>
                <p className="text-[11px] text-green-500">Online</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-6">

          {/* No receiver selected */}
          {!isReceiverSelected && (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <SentIcon className="w-6 h-6 text-purple-400 dark:text-purple-300" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-secondary-text-color">Select a conversation</p>
              <p className="text-xs text-gray-300 dark:text-secondary-text-color">Choose from the left to start chatting</p>
            </div>
          )}

          {/* Messages */}
          {isReceiverSelected && (
            <>
              <div className="flex justify-center mb-4">
                <span className="text-[11px] text-gray-400 dark:text-secondary-text-color bg-gray-100 dark:bg-card-color px-3 py-1 rounded-full">
                  Reply professionally — avoid informal language
                </span>
              </div>

              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 gap-2">
                  <p className="text-xs text-gray-400 dark:text-secondary-text-color">No messages yet — say hello!</p>
                </div>
              )}

              {messages.map(({ Messages, user, fileUrl }, index) => {
                const isSender = user.id === senderId;
                return (
                  <div key={index} className={`flex mb-3 ${isSender ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] break-words whitespace-pre-wrap px-4 py-2.5 text-sm shadow-sm
                      ${isSender
                        ? "bg-purple-500 text-white rounded-2xl rounded-tr-sm"
                        : "bg-white dark:bg-card-color text-gray-800 dark:text-text-color rounded-2xl rounded-tl-sm border border-gray-100 dark:border-border-color"
                      }`}
                    >
                      {Messages}
                  {fileUrl && (
  <div className="mt-2">
    {fileUrl.match(/\.(jpg|png|webp)/i) ? (
      <img
        src={fileUrl}
        alt="sent"
        className="max-w-xs rounded-xl mt-1"
      />
    ) : (
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 mt-1 text-xs underline opacity-80"
      >
        <File02Icon size={13} /> View File
      </a>
    )}
  </div>
)}
                    </div>
                  </div>
                );
              })}
              <div ref={messageref} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 bg-white dark:bg-bg-dark border-t border-gray-100 dark:border-border-color">

          {/* File preview */}
          {fileName && (
            <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg w-fit">
              <File02Icon size={13} className="text-purple-500" />
              <span className="text-[11px] text-purple-600 dark:text-purple-300 max-w-[200px] truncate">{fileName}</span>
              <button onClick={() => { setFile(null); setFileName(""); }} className="text-red-400 hover:text-red-500 ml-1">
                <Cancel01Icon size={11} />
              </button>
            </div>
          )}

          <div className={`flex items-center gap-2 bg-gray-100 dark:bg-card-color rounded-2xl px-4 py-2.5 transition-all
            ${!isReceiverSelected ? "opacity-50 cursor-not-allowed" : "focus-within:ring-2 ring-purple-300 dark:ring-accent-color"}`}
          >
            {/* Attachment */}
            <label className={`cursor-pointer flex-shrink-0 ${!isReceiverSelected ? "pointer-events-none" : ""}`}>
              <input
                type="file"
                disabled={!isReceiverSelected}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0]?.name || "");
                }}
                className="hidden"
              />
              <AttachmentIcon className="w-4 h-4 text-purple-400 dark:text-accent-color" />
            </label>

            {/* Input */}
            <input
              type="text"
              placeholder={isReceiverSelected ? "Type a message..." : "Select a conversation first"}
              value={input}
              disabled={!isReceiverSelected}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent text-sm dark:text-text-color placeholder:text-gray-400 dark:placeholder:text-secondary-text-color focus:outline-none disabled:cursor-not-allowed"
            />

            {/* Send */}
            <button
              onClick={sendMessage}
              disabled={!isReceiverSelected || (!input.trim() && !file)}
              className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all
                ${isReceiverSelected && (input.trim() || file)
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-border-color text-gray-400 cursor-not-allowed"
                }`}
            >
              <SentIcon size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}