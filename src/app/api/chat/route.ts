import { NextRequest, NextResponse } from "next/server";
import { ChatService } from "@/services/chatService";

const chatService = new ChatService();

// Cria novo chat
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const name = body?.name || "Novo Chat";

  try {
    const chat = await chatService.createChat({name});
    return NextResponse.json(chat, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
