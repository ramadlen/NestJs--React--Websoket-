/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Messages from "./pages/Messages";
import MessageInput from "./components/MessageInput";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const send = (value: string) => {
    socket?.emit("messages", value);
    console.log(send);
  };
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="justify-center text-white text-3xl mx-8 bg-blue-600 rounded-xl mt-4">
        Chat App
      </div>
      <div className="flex flex-col mt-5">
        <MessageInput send={send} />
        <Messages messages={messages} />
      </div>
    </div>
  );
}

export default App;
