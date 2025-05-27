import { NextResponse } from "next/server";
import { ChatService } from "@/services/chatService";

const chatService = new ChatService();

// Lista todos os chats
export async function GET() {
  try {
    const chats = await chatService.readAllChats();
    return NextResponse.json(chats, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}