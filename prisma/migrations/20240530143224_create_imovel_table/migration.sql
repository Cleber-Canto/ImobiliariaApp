-- CreateTable
CREATE TABLE "Imovel" (
    "id" SERIAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "disponibilidade" BOOLEAN NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);
