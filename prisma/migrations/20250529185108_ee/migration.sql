-- DropForeignKey
ALTER TABLE "Mensagem" DROP CONSTRAINT "Mensagem_chat_id_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "nome" SET DEFAULT 'Novo Chat';

-- AddForeignKey
ALTER TABLE "Mensagem" ADD CONSTRAINT "Mensagem_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
