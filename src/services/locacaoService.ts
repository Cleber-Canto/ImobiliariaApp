import { PrismaClient, Locacao } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export class LocacaoService {
    async getAllLocacoes(): Promise<Locacao[]> {
        return prisma.locacao.findMany();
    }

    async getLocacaoById(id: string): Promise<Locacao | null> {
        return prisma.locacao.findUnique({ where: { id } });
    }

    async createLocacao(data: Omit<Locacao, 'id'>): Promise<Locacao> {
        const dataInicioISO = new Date(data.dataInicio).toISOString();
        const dataFimISO = new Date(data.dataFim).toISOString();
    
        const newLocacao: Locacao = {
            ...data,
            dataInicio: new Date(dataInicioISO), 
            dataFim: new Date(dataFimISO), 
            id: uuidv4() 
        };
    
        return prisma.locacao.create({ data: newLocacao });
    }
    

    async updateLocacao(id: string, data: Partial<Locacao>): Promise<Locacao | null> {
        if (data.dataInicio && data.dataFim) {
            const dataInicioISO = new Date(data.dataInicio).toISOString();
            const dataFimISO = new Date(data.dataFim).toISOString();
            const updatedLocacao = await prisma.locacao.update({
                where: { id },
                data: {
                    dataInicio: dataInicioISO,
                    dataFim: dataFimISO,
                },
            });
    
            console.log('Locação atualizada:', updatedLocacao);
            return updatedLocacao;
        } else {
            console.error('Data de início ou fim não definida.');
            return null;
        }
    }    

    async deleteLocacao(id: string): Promise<Locacao | null> {
        try {
            const locacaoExistente = await prisma.locacao.findUnique({ where: { id } });
            if (!locacaoExistente) {
                console.log('ID não localizado: ', id);
                return null;
            }
            
            const deletedLocacao = await prisma.locacao.delete({ where: { id } });
            console.log('Locação deletada com sucesso:', deletedLocacao);
            return deletedLocacao;
        } catch (error) {
            console.error('Erro ao deletar locação:', error);
            return null;
        }
    }    
}
