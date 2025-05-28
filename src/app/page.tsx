"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertComp } from "@/components/alertComp";

export default function Home() {
  const [chat_id, setChat_id] = useState<string | null>(null);
  const [isWaitingToRedirect, setIsWaitingToRedirect] = useState(false);
  const [alert, setAlert] = useState<{
    title: string;
    description: string;
  } | null>(null);
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
    } else {
      data = await response.json();
    }

    setChat_id(data.id);
  };

  useEffect(() => {
    getMostRecentChat();
  }, []);

  const handleClick = async () => {
    if (!chat_id) {
      setAlert({
        title: "Desculpe!",
        description:
          "Aguarde um momento, estamos buscando o melhor chat para você.",
      });

      setIsWaitingToRedirect(true);
      return;
    }
    router.push(`/chatbot/${chat_id}`);
  };

  useEffect(() => {
    if (isWaitingToRedirect && chat_id) {
      router.push(`/chatbot/${chat_id}`);
      setIsWaitingToRedirect(false);
    }
  }, [chat_id, isWaitingToRedirect, router]);

  return (
    <>
      {alert && (
        <AlertComp title={alert.title} description={alert.description} />
      )}
      <div
        className={`flex items-center justify-center w-screen h-screen`}
      >
        <div className="flex justify-center items-center w-[70%] h-full  bg-[#1b1c21]">
          <h1 className="text-white text-6xl font-semibold">
            ChatBot - Taurus {chat_id}
          </h1>
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
    </>
  );
}
