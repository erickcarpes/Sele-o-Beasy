import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function GET() {
  try {
    const mensagens = await prisma.mensagem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(mensagens);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Pergunta ausente" }, { status: 400 });
    }

    // 1. Salva a mensagem do usuário no banco
    await prisma.message.create({
      data: {
        texto: question,
        userRole: "USER"
      }
    });

    // 2. Chama a OpenAI para obter a resposta do bot
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: question }]
    });

    const botMessage = completion.choices[0].message.content || "";

    // 3. Salva a mensagem do bot no banco
    await prisma.message.create({
      data: {
        texto: botMessage,
        userRole: "CHAT"
      }
    });

    // 4. Retorna a resposta do bot para o frontend
    return NextResponse.json({ message: botMessage });

  } catch (error: unknown) {
    console.error("Erro no chat API:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
