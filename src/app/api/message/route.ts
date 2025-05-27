import { MessageService } from "@/services/messageService";
import { NextResponse } from "next/server";

const messageService = new MessageService();

// POST: Cria uma nova mensagem de usuário
export async function POST(request: Request) {
  const { chat_id, question } = await request.json();

  try {
    const botMessage = await messageService.createUserMessage({
      chat_id,
      question,
    });
    return NextResponse.json(
      { message: botMessage },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return (
      NextResponse.json({ error: errorMessage }),
      {
        status: 500,
      }
    );
  }
}
