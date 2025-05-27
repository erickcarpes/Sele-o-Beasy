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

export function MobileSideBar({chats}: {chats: Chat[]}) {
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
      <SheetContent side="left" className="bg-[#2d2f37] text-white w-50">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">Taurus</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <button className="flex w-full gap-3 border-l-1 px-2 py-1">
              <Info />
              <h2>Sobre nós</h2>
          </button>

          <div className="flex w-full gap-3 border-l-1 px-2 py-1">
              <Brain />
              <h2>Chats</h2>
              <Plus className="rounded-sm border-1 bg-green-600"/>
          </div>

          <ChatsDisplay chats={chats}></ChatsDisplay>
        </div>
      </SheetContent>
    </Sheet>
  );
}
