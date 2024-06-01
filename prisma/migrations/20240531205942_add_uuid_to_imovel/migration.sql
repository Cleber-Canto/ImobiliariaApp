/*
  Warnings:

  - The primary key for the `Imovel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `criadoEm` on the `Imovel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Imovel" DROP CONSTRAINT "Imovel_pkey",
DROP COLUMN "criadoEm",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Imovel_id_seq";
