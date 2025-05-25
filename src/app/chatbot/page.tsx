"use client";
import QuestionBar from "@/components/questionBar";
import { useState } from "react";

interface ChatbotProps {
  onSend: (question: string) => void;
}
export default function Chatbot({ onSend }: ChatbotProps) {
  const [question, setQuestion] = useState("");
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-5 bg-[#1b1c21]">
      <div className="w-full md:w-120 lg:w-150 ">
        <QuestionBar
          onClick={() => {
            onSend(question); // Mandar a mensagem para o chatbot pela api
            setQuestion("");
          }}
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        ></QuestionBar>
      </div>
    </div>
  );
}
