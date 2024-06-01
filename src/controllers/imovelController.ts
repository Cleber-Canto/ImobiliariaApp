import { Request, Response } from 'express';
import { ImovelService } from '../services/imovelService';

const imovelService = new ImovelService();

const logAndSendError = (errorMessage: string, res: Response, error: unknown) => {
  console.error(errorMessage, error);
  res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
};

const sendSuccessResponse = (res: Response, message: string, data?: any) => {
  console.log(message);
  res.status(200).json({ message, data });
};

export const getAllImoveis = async (req: Request, res: Response) => {
  try {
    const imoveis = await imovelService.getAllImoveis();
    sendSuccessResponse(res, 'Lista de imóveis recuperada com sucesso', imoveis);
  } catch (error: unknown) {
    logAndSendError('Erro ao buscar todos os imóveis:', res, error);
  }
};

export const getImovelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const imovel = await imovelService.getImovelById(id);
    if (!imovel) return res.status(404).json({ error: 'Imóvel não encontrado' });
    sendSuccessResponse(res, `Imóvel com ID ${id} recuperado com sucesso`, imovel);
  } catch (error: unknown) {
    logAndSendError(`Erro ao buscar o imóvel com ID ${id}:`, res, error);
  }
};

export const createImovel = async (req: Request, res: Response) => {
  const { endereco, cep, valor, disponibilidade } = req.body;
  try {
    const newImovel = await imovelService.createImovel({
      endereco, cep, valor, disponibilidade,
      alugado: false // Configura como não alugado
    });
    sendSuccessResponse(res, 'Imóvel criado com sucesso', newImovel);
  } catch (error: unknown) {
    logAndSendError('Erro ao criar o imóvel:', res, error);
  }
};

export const updateImovel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { endereco, cep, valor, disponibilidade } = req.body;
  try {
    const updatedImovel = await imovelService.updateImovel(id, { endereco, cep, valor, disponibilidade });
    sendSuccessResponse(res, `Imóvel com ID ${id} atualizado com sucesso`, updatedImovel);
  } catch (error: unknown) {
    logAndSendError(`Erro ao atualizar o imóvel com ID ${id}:`, res, error);
  }
};

export const deleteImovel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await imovelService.deleteImovel(id);
    sendSuccessResponse(res, `Imóvel com ID ${id} deletado com sucesso`);
  } catch (error: unknown) {
    logAndSendError(`Erro ao deletar o imóvel com ID ${id}:`, res, error);
  }
};

export const getImoveisDisponiveis = async (req: Request, res: Response) => {
  try {
    const imoveis = await imovelService.getAllImoveis();
    const imoveisDisponiveis = imoveis.filter(imovel => imovel.disponibilidade && !imovel.alugado);
    if (imoveisDisponiveis.length === 0) {
      return res.status(404).json({ error: 'Nenhum imóvel disponível encontrado' });
    }
    sendSuccessResponse(res, 'Lista de imóveis disponíveis recuperada com sucesso', imoveisDisponiveis);
  } catch (error: unknown) {
    logAndSendError('Erro ao buscar os imóveis disponíveis:', res, error);
  }
};


export const getImoveisLocados = async (req: Request, res: Response) => {
  try {
    const imoveis = await imovelService.getAllImoveis();
    const imoveisLocados = imoveis.filter(imovel => imovel.alugado);
    sendSuccessResponse(res, 'Lista de imóveis locados recuperada com sucesso', imoveisLocados);
  } catch (error: unknown) {
    logAndSendError('Erro ao buscar os imóveis locados:', res, error);
  }
};

export const createImovelParaLocacao = async (req: Request, res: Response) => {
  const { endereco, cep, valor, disponibilidade } = req.body;
  try {
    const newImovel = await imovelService.createImovel({
      endereco, cep, valor, disponibilidade,
      alugado: true // Configura como alugado
    });
    sendSuccessResponse(res, 'Imóvel para locação criado com sucesso', newImovel);
  } catch (error: unknown) {
    logAndSendError('Erro ao criar o imóvel para locação:', res, error);
  }
};
