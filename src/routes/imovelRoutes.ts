import express from 'express';
import { getAllImoveis, createImovel, getImovelById, updateImovel, deleteImovel } from '../controllers/imovelController';

const router = express.Router();

router.get('/', getAllImoveis);
router.post('/', createImovel);
router.get('/:id', getImovelById);
router.put('/:id', updateImovel);
router.delete('/:id', deleteImovel);

export default router;
