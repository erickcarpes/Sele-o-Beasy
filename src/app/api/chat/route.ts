import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

// Instanciar o cliente Gemini com a chave da API
const gemini = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

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
      return NextResponse.json(
        { error: "Nenhuma pergunta encontrada" },
        { status: 400 }
      );
    }

    // Salva a mensagem do usuário no banco
    await prisma.mensagem.create({
      data: {
        texto: question,
        userRole: "USER",
      },
    });

    // Chama a OpenAI para obter a resposta do bot
    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: question,
    });

    const botMessage = response.text || "Desculpe, não consegui entender a pergunta.";

    // Salva a mensagem do bot no banco
    await prisma.mensagem.create({
      data: {
        texto: botMessage,
        userRole: "CHAT",
      },
    });

    // Retorna a resposta do bot
    return NextResponse.json({ message: botMessage });
  } catch (error: unknown) {
    console.error("Erro no chat API:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
