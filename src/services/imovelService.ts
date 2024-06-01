import { PrismaClient, Imovel } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class ImovelService {
  async getAllImoveis(): Promise<Imovel[]> {
    try {
      const imoveis = await prisma.imovel.findMany();
      console.log('Lista de imóveis recuperada com sucesso:', imoveis);
      return imoveis;
    } catch (error) {
      console.error('Erro ao buscar todos os imóveis:', error);
      throw error;
    }
  }

  async getImovelById(id: string): Promise<Imovel | null> {
    try {
      const imovel = await prisma.imovel.findUnique({ where: { id } });
      if (!imovel) console.log(`Imóvel com ID ${id} não encontrado`);
      else console.log(`Imóvel com ID ${id} recuperado com sucesso:`, imovel);
      return imovel;
    } catch (error) {
      console.error(`Erro ao buscar o imóvel com ID ${id}:`, error);
      throw error;
    }
  }

  async createImovel(data: Omit<Imovel, 'id'>): Promise<Imovel> {
    try {
      const newImovel: Imovel = {
        ...data,
        id: uuidv4() // Gerando ID único criptografado
      };
      const createdImovel = await prisma.imovel.create({ data: newImovel });
      console.log('Imóvel criado com sucesso:', createdImovel);
      return createdImovel;
    } catch (error) {
      console.error('Erro ao criar o imóvel:', error);
      throw error;
    }
  }

  async updateImovel(id: string, data: Partial<Imovel>): Promise<Imovel | null> {
    try {
      const updatedImovel = await prisma.imovel.update({ where: { id }, data });
      if (!updatedImovel) console.log(`Imóvel com ID ${id} não encontrado`);
      else console.log(`Imóvel com ID ${id} atualizado com sucesso:`, updatedImovel);
      return updatedImovel;
    } catch (error) {
      console.error(`Erro ao atualizar o imóvel com ID ${id}:`, error);
      throw error;
    }
  }

  async deleteImovel(id: string): Promise<void> {
    try {
      await prisma.imovel.delete({ where: { id } });
      console.log(`Imóvel com ID ${id} deletado com sucesso`);
    } catch (error) {
      console.error(`Erro ao deletar o imóvel com ID ${id}:`, error);
      throw error;
    }
  }
}
