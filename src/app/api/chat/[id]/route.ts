import { NextRequest, NextResponse } from "next/server";
import { ChatService } from "@/services/chatService";

const chatService = new ChatService();

// GET específico: /api/chat/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

// PATCH: Atualiza nome de um chat via /api/chat/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Nome é necessário" }, { status: 400 });
  }

  try {
    const updatedChat = await chatService.updateChat({ id, name });
    return NextResponse.json(updatedChat, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE: /api/chat/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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
