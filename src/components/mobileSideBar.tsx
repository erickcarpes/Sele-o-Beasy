import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Brain, Info, Bot } from "lucide-react";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChatsDisplay } from "@/components/chatsDisplay";
import { AboutDialog } from "./aboutDialog";

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
      toast.error("Erro ao criar novo chat!");
    } else {
      toast.success("Novo chat criado com sucesso!");
      refreshChats();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-[#1b1c21] hover:bg-[#2d2f37] h-15 shadow-lg hover:cursor-pointer hover:scale-105">
          <Image
            src="/taurus-logo.png"
            width={60}
            height={50}
            alt="Taurus Logo"
            className="w-12 md:w-15"
          ></Image>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-[#2d2f37] text-white w-50 md:w-60 rounded-r-4xl"
      >
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">Taurus</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <AboutDialog
            buttonName="Sobre nós"
            title="Sobre a Taurus:"
            description1="A Taurus é uma empresa corporativa tradicional, com uma cultura marcada por hierarquias rígidas e lideranças da Geração X pouco familiarizadas com tecnologia. Mesmo assim, é um ambiente onde ideias ousadas podem ganhar espaço — especialmente quando vêm de pessoas comprometidas."
            description2="Foi nesse cenário que, Cleiton, um desenvolvedor talentoso, viu na sobrecarga de tarefas manuais uma chance de sugerir o uso de inteligência artificial para otimizar processos. Inicialmente rejeitada, sua proposta despertou interesse nos líderes, que agora aguardam ansiosos pelo protótipo de um chatbot com a identidade da Taurus. Uma oportunidade única para mostrar como tradição e inovação podem se complementar."
            icon={<Info />}
          ></AboutDialog>

          <AboutDialog
            buttonName="ChatBot"
            title="Sobre o ChatBot:"
            description1="O ChatBot da Taurus é uma ferramenta inovadora que visa otimizar a comunicação interna e agilizar processos. Com uma interface amigável e intuitiva, ele permite que os colaboradores acessem informações, realizem tarefas e interajam com o sistema de forma rápida e eficiente."
            description2="Desenvolvido com tecnologia de ponta, o ChatBot é capaz de aprender com as interações, tornando-se cada vez mais inteligente e adaptado às necessidades da empresa. Ele é um passo importante na jornada da Taurus rumo à transformação digital."
            icon={<Bot />}
          ></AboutDialog>

          <div className="flex w-full gap-3 border-l-1 px-2 py-1">
            <Brain size={30} />
            <div className="flex justify-between w-full">
              <h2>Chats</h2>
              <Plus
                onClick={() => handleAddChat()}
                className="rounded-sm bg-green-600 hover:scale-110 hover:cursor-pointer transition-transform ease-in-out duration-300"
              />
            </div>
          </div>

          <ChatsDisplay
            refreshChats={refreshChats}
            chats={chats}
          ></ChatsDisplay>
        </div>
      </SheetContent>
      <Toaster />
    </Sheet>
  );
}
