import { Trash, Check, Pencil } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Chat {
  id: string;
  nome: string;
}

interface ChatsDisplayProps {
  chats: Chat[];
  refreshChats: () => void;
}

export function ChatsDisplay({ chats, refreshChats }: ChatsDisplayProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [newChatName, setNewChatName] = useState<string>("");

  const handleDeleteChat = async (chatId: string) => {
    const response = await fetch(`/api/chat/${chatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Erro ao deletar chat", {
        description: (
          <span className="text-sm text-red-700">Você não pode estar no chat que desejas deletar.</span>
        ),
      });
    } else {
      toast.success("Chat deletado com sucesso");
      refreshChats();
    }
  };

  const handlePatchChat = async (id: string) => {
    const response = await fetch(`/api/chat/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome: newChatName }),
    });
    if (!response.ok) {
      toast.error("Erro ao atualizar o nome do chat!");
    } else {
      toast.success("Nome do chat atualizado com sucesso!")
      refreshChats();
    }
  };

  useEffect(() => {
    if (editingChatId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingChatId]);

  return (
    <div className="flex flex-col w-full max-h-95 lg:max-h-115 gap-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent overflow-y-auto border-1 rounded-br-lg">
      {chats.map((chat, index) => (
        <div
          key={chat.id}
          className={`flex p-2 w-full justify-between gap-2 rounded-br-lg ${
            chats.length > 1 && chats.length !== index + 1 ? "border-b-1" : ""
          }`}
        >
          {editingChatId === chat.id? (
            <div className="flex w-full gap-2 justify-between">
              <input
                type="text"
                defaultValue={chat.nome}
                className="w-full focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-none"
                ref={inputRef}
                onChange={(e) => {
                  setNewChatName(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  if (!newChatName.trim()) {
                    return;
                  }
                  handlePatchChat(chat.id);
                  setEditingChatId(null);
                  setNewChatName("");
                }}
                className="text-white rounded-sm overflow-hidden hover:bg-[#3a3c44] hover:cursor-pointer"
              >
                <Check className="rounded-sm bg-green-700 mr-2 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300" />
              </button>
            </div>
          ) : (
            <div className="flex w-full gap-2 justify-between">
              <Link href={`/chatbot/${chat.id}`} className="w-full overflow-hidden whitespace-nowrap">
                <button className="text-white rounded-sm overflow-ellipsis overflow-hidden text-left w-full hover:bg-[#3a3c44] hover:cursor-pointer">
                  {chat.nome}
                </button>
              </Link>
              <div className="flex gap-2">
                <Pencil
                  onClick={() => setEditingChatId(chat.id)}
                  className="rounded-sm bg-blue-700 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300"
                ></Pencil>
                <Trash
                  onClick={() => handleDeleteChat(chat.id)}
                  className="rounded-sm shadow-lg bg-red-700 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300"
                ></Trash>
              </div>
            </div>
          )}
        </div>
      ))}
      <Toaster />
    </div>
  );
}
