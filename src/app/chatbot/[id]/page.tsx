"use client";
import QuestionBar from "@/components/questionBar";
import Spinner from "@/components/spinner";
import Wrapper from "@/components/wrapper";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MobileSideBar } from "@/components/mobileSideBar";

interface Messages {
  id: string;
  content: string;
  role: "USER" | "CHAT";
  createdAt?: Date;
}

interface Chat {
  id: string;
  name: string;
  messages: Messages[];
}

export default function Chatbot() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isQuestionAnswering, setIsQuestionAnswering] =
    useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const { id } = useParams<{ id: string }>();

  const handleSend = async (question: string) => {
    setIsQuestionAnswering(true);
    setQuestion("");
    const userMessage: Messages = {
      id: new Date().toISOString(),
      content: question,
      role: "USER",
      createdAt: new Date(),
    };
    setMessages((prevmessages) => [...prevmessages, userMessage]);

    const chatMessage: Messages = {
      id: "temp-id",
      content: "Digitando...",
      role: "CHAT",
    };
    setMessages((prevmessages) => [...prevmessages, chatMessage]);

    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: id, question }),
    });

    if (!response.ok) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "temp-id"
            ? { ...msg, texto: "Erro ao gerar resposta." }
            : msg
        )
      );
      return;
    }

    const data = await response.json();

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === "temp-id"
          ? {
              id: new Date().toISOString(),
              content: data.message,
              role: "CHAT",
            }
          : msg
      )
    );
    setIsQuestionAnswering(false);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const getMessages = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/chat/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Erro ao buscar messages");
        return [];
      }

      const data = await response.json();
      setMessages(data.messages);
      setIsLoading(false);
    };

    getMessages();
  }, [id]);

  const getAllChats = async () => {
    const response = await fetch("/api/chat/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar chats");
      return [];
    }

    const data = await response.json();
    setChats(data);
  };

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-screen h-screen p-5 bg-[#1b1c21]`}
    >
      <div className="flex w-full border-b-1 mb-5">
        <div className="absolute top-4 md:top-5 left-5">
          <MobileSideBar refreshChats={getAllChats} chats={chats} />
        </div>
        <div className="flex w-screen justify-center items-center">
          <h1 className="text-white text-4xl font-semibold mb-5">Taurus</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col w-full h-full items-center justify-center gap-3">
          <Spinner></Spinner>
          <p className="text-white">Carregando...</p>
        </div>
      ) : (
        <div
          className={`flex flex-col w-full h-full justify-center overflow-hidden md:w-120 lg:w-150`}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col justify-end text-white mb-3">
              <div className="flex justify-center gap-3">
                <Image
                  src="/taurus-logo.png"
                  width={40}
                  height={40}
                  alt="Taurus Logo"
                />
                <h1 className="text-2xl mb-2">Oi, eu sou o TaurusBot!</h1>
              </div>
              <h3 className="flex justify-center">
                Como posso te ajudar hoje?
              </h3>
            </div>
          ) : (
            <div className="flex h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent gap-2">
              <Wrapper messages={messages}></Wrapper>
            </div>
          )}
          <div>
            <QuestionBar
              onClick={() => {
                if (question === "") return;
                handleSend(question);
              }}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (!isQuestionAnswering) {
                  if (e.key === "Enter" && !e.shiftKey) {
                    if (question.trim() !== "") {
                      handleSend(question);
                    }
                  }
                }
              }}
              isQuestionAnswering={isQuestionAnswering}
              value={question}
            ></QuestionBar>
          </div>
        </div>
      )}
    </div>
  );
}
