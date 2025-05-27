/*
  Warnings:

  - You are about to drop the column `userRole` on the `Mensagem` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mensagem" DROP COLUMN "userRole",
ADD COLUMN     "role" "UserRole" NOT NULL;
