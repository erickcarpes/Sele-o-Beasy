import { NextResponse } from "next/server";
import { ChatService } from "@/services/chatService";

const chatService = new ChatService();

export async function GET() {
  try {
    const chat = await chatService.readMostRecentChat();
    if (!chat) {
      return NextResponse.json({ error: "Nenhum chat encontrado" }, { status: 404 });
    }
    return NextResponse.json(chat, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

