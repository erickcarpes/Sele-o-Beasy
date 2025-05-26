"use client";
import QuestionBar from "@/components/questionBar";
import Spinner from "@/components/spinner";
import Wrapper from "@/components/wrapper";
import { useCallback, useEffect, useState } from "react";

interface Mensagem {
  id: number;
  texto: string;
  userRole: "USER" | "CHAT";
}

export default function Chatbot() {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [mensagens, setMensagens] = useState([] as Mensagem[]);

  const carregarMensagens = useCallback(async () => {
    const msgs = await getMessages();
    setMensagens(msgs);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    carregarMensagens();
  }, [carregarMensagens]);

  const handleSend = async (question: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    await carregarMensagens();

    if (!response.ok) {
      console.error("Erro ao enviar a mensagem");
      return;
    }

    const data = await response.json();
    return data.message;
  };

  const getMessages = async () => {
    const response = await fetch("/api/chat", {
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
    return data;
  };

  return (
    <div
      className={`flex flex-col items-center ${
        mensagens.length === 0 ? "justify-center" : "justify-start"
      } w-screen h-screen p-5 bg-[#1b1c21]`}
    >
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div
          className={`flex flex-col w-full min-h-full justify-center md:w-120 lg:w-150`}
        >
          {mensagens.length !== 0 && (
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
