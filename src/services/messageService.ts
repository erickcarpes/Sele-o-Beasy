import { GoogleGenAI } from "@google/genai";
import prisma from "@/lib/prisma";

interface CreateQuestionParams {
  chat_id: string;
  question: string;
}

// Instanciar o cliente Gemini com a chave da API
const gemini = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

class MessageService {
  // Rota para criar mensagens no chat
  async createUserMessage({ chat_id, question }: CreateQuestionParams) {
    try {
      // Salva a pergunta do usuário no banco de dados
      await prisma.mensagem.create({
        data: {
          texto: question,
          role: "USER",
          chat_id: chat_id,
        },
      });
      const botMessage = this.createChatMessage({ chat_id, question });
      return botMessage;
    } catch (error: unknown) {
      console.error("Erro ao criar mensagem de usuário:", error);
    }
  }

  async createChatMessage({ chat_id, question }: CreateQuestionParams) {
    try {
      // Chama a OpenAI para obter a resposta do bot
      const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: question,
        config: {
          systemInstruction:
            "Você é um assistente de IA da empresa Taurus. Você deve responder todas as perguntas de forma clara, objetiva e mais concisa possível.",
        },
      });

      const botMessage =
        response.text || "Desculpe, não consegui entender a pergunta.";

      // Salva a mensagem do bot no banco
      await prisma.mensagem.create({
        data: {
          texto: botMessage,
          role: "CHAT",
          chat_id: chat_id,
        },
      });

      // Retorna a resposta do bot
      return botMessage;
    } catch (error: unknown) {
      console.error("Erro ao criar mensagem:", error);
      throw new Error("Erro ao criar mensagem");
    }
  }
}

export { MessageService };
