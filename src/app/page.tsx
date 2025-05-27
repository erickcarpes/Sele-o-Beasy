"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [transition, setTransition] = useState(false);
  const router = useRouter();

 const chat_id = async () => {
    const response = await fetch("/api/chat/mostRecent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const newChat = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await newChat.json();
      return data.id;
    }

    const data = await response.json();
    return data.id;
  };
  
  const handleClick = () => {
    setTransition(true);
    setTimeout(() => {
      router.push(`/chatbot/${chat_id}`);
      setTransition(false);
    }, 800);
  };
  return (
    <div
      className={`flex items-center justify-center w-screen h-screen ${
        transition ? "opacity-0" : "opacity-100"
      } transition-opacity duration-800 ease-in-out`}
    >
      <div className="flex justify-center items-center w-[70%] h-full  bg-[#1b1c21]">
        <h1 className="text-white text-6xl font-semibold">
          ChatBot - Taurus
        </h1>
      </div>

      <div className="flex justify-center items-center w-[30%] h-full bg-green-800">
        <Button
          onClick={handleClick}
          className="w-40 h-17 bg-[#2d2f37] text-2xl text-green-600 hover:bg-white hover:cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
