"use client";
import QuestionBar from "@/components/questionBar";
import Spinner from "@/components/spinner";
import Wrapper from "@/components/wrapper";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MobileSideBar } from "@/components/mobileSideBar";

interface Mensagem {
  id: number;
  texto: string;
  role: "USER" | "CHAT";
}

interface Chat {
  id: string;
  nome: string;
}

export default function Chatbot() {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [mensagens, setMensagens] = useState([] as Mensagem[]);
  const [chats, setChats] = useState([] as Chat[]);
  const { id } = useParams();

  const handleSend = async (question: string) => {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: id, question }),
    });

    if (!response.ok) {
      console.error("Erro ao enviar a mensagem");
      return;
    }

    atualizarMensagens();

    const data = await response.json();
    return data.message;
  };

  const getMessages = useCallback(async () => {
    const response = await fetch(`/api/chat/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar mensagens");
      return [];
    }

    const data = await response.json();
    return data.mensagens;
  }, [id]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      const msgs = await getMessages();
      setMensagens(msgs);
      setIsLoading(false);
    };

    fetchMessages();
  }, [getMessages]);

  const atualizarMensagens = async () => {
    const msgs = await getMessages();
    setMensagens(msgs);
  };

  const getAllChats = async () => {
    const response = await fetch("/api/chat", {
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
    return data.chats;
  }

  useEffect(() => {
    const fetchChats = async () => {
      const chatsData = await getAllChats();
      setChats(chatsData);
    };

    fetchChats();
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-screen max-h-screen p-5 bg-[#1b1c21]`}
    >
      <div className="flex w-full border-b-1 mb-5">
        <div className="flex justify-start">
          <MobileSideBar chats={chats}/>
        </div>
        <div className="flex w-screen justify-center items-center">
          <h1 className="text-white text-4xl font-semibold mb-5">Taurus</h1>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col w-full h-screen items-center justify-center gap-3">
          <Spinner></Spinner>
          <p className="text-white">Carregando...</p>
        </div>
      ) : (
        <div
          className={`flex flex-col w-full max-h-full overflow-hidden justify-center md:w-120 lg:w-150`}
        >
          {mensagens.length === 0 ? (
            <div className="text-center text-white mb-3 justify-center">
              <div className="flex justify-center gap-3">
                <Image
                  src="/taurus-logo.png"
                  width={40}
                  height={10}
                  alt="Taurus Logo"
                />
                <h1 className="text-2xl mb-2">Oi, eu sou o TaurusBot!</h1>
              </div>
              <h3>Como posso te ajudar hoje? {id}</h3>
            </div>
          ) : (
            <div className="flex h-full overflow-y-auto gap-2">
              <Wrapper messages={mensagens}></Wrapper>
            </div>
          )}
          <QuestionBar
            onClick={() => {
              if (question === "") return;
              handleSend(question);
              setQuestion("");
            }}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                if (question.trim() !== "") {
                  handleSend(question.trim());
                  setQuestion("");
                }
              }
            }}
            value={question}
          ></QuestionBar>
        </div>
      )}
    </div>
  );
}
