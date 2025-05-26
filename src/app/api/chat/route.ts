import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

// Instanciar o cliente OpenAI com a chave da API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rota para lidar com requisições GET
export async function GET() {
  try {
    // Busca todas as mensagens do banco de dados, mais antigas primeiro
    const mensagens = await prisma.mensagem.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(mensagens);
  } catch (error) {
    console.error("Erro buscando mensagens:", error);
  }
}

// Rota para lidar com requisições POST
export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Nenhuma pergunta encontrada" }, { status: 400 });
    }

    // Salva a mensagem do usuário no banco
    await prisma.mensagem.create({
      data: {
        texto: question,
        userRole: "USER"
      }
    });

    // Chama a OpenAI para obter a resposta do bot
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    });

    const botMessage = completion.choices[0].message.content || "";

    // Salva a mensagem do bot no banco
    await prisma.mensagem.create({
      data: {
        texto: botMessage,
        userRole: "CHAT"
      }
    });

    // Retorna a resposta do bot
    return NextResponse.json({ message: botMessage });

  } catch (error: unknown) {
    console.error("Erro no chat API:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
