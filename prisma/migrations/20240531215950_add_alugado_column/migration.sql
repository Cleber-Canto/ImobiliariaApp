/*
  Warnings:

  - Added the required column `alugado` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN "alugado" BOOLEAN NOT NULL DEFAULT false;

