import { NextRequest, NextResponse } from "next/server";
import { ChatService } from "@/services/chatService";

const chatService = new ChatService();

// Cria novo chat
export async function POST(request: NextRequest) {
  const { nome } = await request.json();

  try {
    const chat = await chatService.createChat(nome);
    return NextResponse.json(chat, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

