"use client";
import Bubble from "@/components/bubble";
import QuestionBar from "@/components/questionBar";
import Wrapper from "@/components/wrapper";
import { useEffect, useState } from "react";

interface Mensagem {
  id: number;
  texto: string;
  userRole: "user" | "chat";
}

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const carregarMensagens = async () => {
      const msgs = await getMessages();
      setMensagens(msgs);
    };
    carregarMensagens();
  }, []);

  const handleSend = async (question: string) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

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
    <div className="flex flex-col items-center w-screen h-screen p-5 bg-[#1b1c21]">
      <div className="flex flex-col w-full md:w-120 lg:w-150">
        <div className="flex items-end flex-col w-[92%] mx-auto gap-2">
          <Wrapper>
            {mensagens.map((msg: Mensagem) => (
              <Bubble key={msg.id} user={msg.userRole} message={msg.texto} />
            ))}
          </Wrapper>
        </div>
        <QuestionBar
          onClick={() => {
            if (question === "") return;
            handleSend(question);
            setQuestion("");
          }}
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        ></QuestionBar>
      </div>
    </div>
  );
}
