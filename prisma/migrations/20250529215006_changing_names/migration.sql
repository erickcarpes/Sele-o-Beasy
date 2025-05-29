/*
  Warnings:

  - You are about to drop the column `nome` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the `Mensagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mensagem" DROP CONSTRAINT "Mensagem_chat_id_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Novo Chat';

-- DropTable
DROP TABLE "Mensagem";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL,
    "chat_id" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
