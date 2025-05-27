import { MessageService } from "@/services/messageService";
import { NextResponse } from "next/server";

const messageService = new MessageService();

// POST: Cria uma nova mensagem de usuário
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { question } = await request.json();

  try {
    const botMessage = await messageService.createUserMessage({ id, question });
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
