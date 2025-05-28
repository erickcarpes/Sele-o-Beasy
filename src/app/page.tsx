"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { get } from "http";

export default function Home() {
  const [transition, setTransition] = useState(false);
  const [chat_id, setChat_id] = useState<string | null>(null);
  const router = useRouter();

  const getMostRecentChat = async () => {
    const response = await fetch("/api/chat/mostRecent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data;
    if (response.status === 404) {
      const newChat = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await newChat.json();
      setChat_id(data.id);
    } else {
      data = await response.json();
    }

    setChat_id(data.id);
  };

  useEffect(() => {
    getMostRecentChat();
  }, []);

  const handleClick = async () => {
    setTransition(true);
    setTimeout(() => {
      router.push(`/chatbot/${chat_id}`);
    }, 0);
    setTransition(false);
  };
  return (
    <div
      className={`flex items-center justify-center w-screen h-screen ${
        transition ? "opacity-0" : "opacity-100"
      } transition-opacity duration-800 ease-in-out`}
    >
      <div className="flex justify-center items-center w-[70%] h-full  bg-[#1b1c21]">
        <h1 className="text-white text-6xl font-semibold">ChatBot - Taurus</h1>
      </div>

      <div className="flex justify-center items-center w-[30%] h-full bg-red-700">
        <Button
          onClick={handleClick}
          className="w-40 h-17 bg-white text-2xl text-red-700 hover:bg-white hover:cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
