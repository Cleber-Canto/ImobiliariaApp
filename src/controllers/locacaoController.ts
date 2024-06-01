import { Request, Response } from 'express';
import { LocacaoService } from '../services/locacaoService';

const locacaoService = new LocacaoService();

const logAndSendError = (errorMessage: string, res: Response, error: unknown) => {
  console.error(errorMessage, error);
  res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
};

export const getAllLocacoes = async (req: Request, res: Response) => {
  try {
    const locacoes = await locacaoService.getAllLocacoes();
    res.json(locacoes);
  } catch (error: unknown) {
    logAndSendError('Error fetching all locacoes:', res, error);
  }
};

export const getLocacaoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const locacao = await locacaoService.getLocacaoById(id);
    if (!locacao) return res.status(404).json({ error: 'Locação não encontrada' });
    res.json(locacao);
  } catch (error: unknown) {
    logAndSendError(`Error fetching locacao with ID ${id}:`, res, error);
  }
};

export const createLocacao = async (req: Request, res: Response) => {
  const { imovelId, dataInicio, dataFim } = req.body;
  try {
    const newLocacao = await locacaoService.createLocacao({
      imovelId, dataInicio, dataFim
    });
    res.status(201).json(newLocacao);
  } catch (error: unknown) {
    logAndSendError('Error creating locacao:', res, error);
  }
};

export const updateLocacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { dataInicio, dataFim } = req.body;
  try {
    const updatedLocacao = await locacaoService.updateLocacao(id, { dataInicio, dataFim });
    res.json(updatedLocacao);
  } catch (error: unknown) {
    logAndSendError(`Error updating locacao with ID ${id}:`, res, error);
  }
};

export const deleteLocacao = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await locacaoService.deleteLocacao(id);
    res.status(204).send();
  } catch (error: unknown) {
    logAndSendError(`Error deleting locacao with ID ${id}:`, res, error);
  }
};
