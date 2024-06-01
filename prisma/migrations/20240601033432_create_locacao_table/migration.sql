-- CreateTable
CREATE TABLE "Locacao" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Locacao_pkey" PRIMARY KEY ("id")
);
