"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface QuestionBarProps {
  onClick: () => string | void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function QuestionBar({
  onChange,
  onClick,
  value,
  onKeyDown,
}: QuestionBarProps) {
  return (
    <div className={`flex bg-[#2d2f37] rounded-4xl p-2 justify-between shadow-lg border-1 mt-2`}>
        <Input
          className="border-none ml-2 text-white md:text-md caret-white focus-visible:ring-0 placeholder:text-gray-400"
          onChange={onChange}
          value={value}
          placeholder="O que desejas perguntar?"
          onKeyDown={onKeyDown}
        ></Input>
        <Button
          onClick={onClick}
          className="bg-transparent rounded-4xl mr-2 hover:bg-[#44464d] hover:cursor-pointer"
        >
          <Send className="text-green-600 hover:text-white" />
        </Button>
    </div>
  );
}
