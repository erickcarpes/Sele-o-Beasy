import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Brain, Info } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatsDisplay } from "@/components/chatsDisplay";

interface Chat {
  id: string;
  nome: string;
}

interface MobileSideBarProps {
  chats: Chat[];
  refreshChats: () => void;
}

export function MobileSideBar({ chats, refreshChats }: MobileSideBarProps) {
  const handleAddChat = async () => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Erro ao criar novo chat");
      // Toast de erro
    } else {
      // Toast de sucesso
      // Atualizar a lista de chats, se necessário
      console.log("Novo chat criado com sucesso");
    }
    refreshChats();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent hover:cursor-pointer">
          <Image
            src="/taurus-logo.png"
            width={40}
            height={10}
            alt="Taurus Logo"
          ></Image>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-[#2d2f37] text-white w-50 rounded-r-4xl"
      >
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">Taurus</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <button className="flex w-full gap-3 border-l-1 px-2 py-1 rounded-r-xl hover:cursor-pointer hover:bg-[#3a3c44]">
            <Info />
            <h2>Sobre nós</h2>
          </button>

          <div className="flex w-full gap-3 border-l-1 px-2 py-1">
            <Brain />
            <div className="flex justify-between w-full">
              <h2>Chats</h2>
              <Plus
                onClick={() => handleAddChat()}
                className="rounded-sm bg-green-600 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300"
              />
            </div>
          </div>

          <ChatsDisplay refreshChats={refreshChats} chats={chats}></ChatsDisplay>
        </div>
      </SheetContent>
    </Sheet>
  );
}
