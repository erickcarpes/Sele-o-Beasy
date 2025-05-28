import { NextRequest, NextResponse } from "next/server";
import { ChatService } from "@/services/chatService";

const chatService = new ChatService();

// GET específico: /api/chat/[id]
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Id é necessário" }, { status: 400 });
  }

  try {
    const chat = await chatService.readChat({ id });
    return NextResponse.json(chat, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT: Atualiza nome de um chat via /api/chat/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { nome } = await request.json();

  if (!nome) {
    return NextResponse.json({ error: "Nome is required" }, { status: 400 });
  }

  try {
    const updatedChat = await chatService.updateChat({ id, nome });
    return NextResponse.json(updatedChat, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE: /api/chat/[id]
export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await chatService.deleteChat({ id });
    return NextResponse.json(
      { message: "Chat deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
