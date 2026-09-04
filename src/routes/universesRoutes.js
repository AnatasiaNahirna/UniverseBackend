import { Router } from 'express';
import {
  getAllUniverses,
  getUniverseById,
  createUniverse,
  updateUniverse,
  deleteUniverse,
} from '../controllers/universesController.js';

const router = Router();

router.get('/universes', getAllUniverses);
router.get('/universes/:id', getUniverseById);
router.post('/universes', createUniverse);
router.patch('/universes/:id', updateUniverse);
router.delete('/universes/:id', deleteUniverse);

export default router;
