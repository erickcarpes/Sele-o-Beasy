-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CHAT', 'USER');

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRole" "UserRole" NOT NULL,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);
