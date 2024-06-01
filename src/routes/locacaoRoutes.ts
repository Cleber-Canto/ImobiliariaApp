import express from 'express';
import { createLocacao, getAllLocacoes, getLocacaoById, updateLocacao, deleteLocacao } from '../controllers/locacaoController';

const router = express.Router();

router.get('/', getAllLocacoes);
router.post('/', createLocacao);
router.get('/:id', getLocacaoById);
router.put('/:id', updateLocacao);
router.delete('/:id', deleteLocacao);

export default router;
