import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

import {
  getAllUniverses,
  getUniverseById,
  createUniverse,
  updateUniverse,
  deleteUniverse,
} from '../controllers/universesController.js';

import {
  createUniverseSchema,
  universeIdSchema,
  updateUniverseSchema,
} from '../validations/universeValidation.js';

const router = Router();

router.use('/universes', authenticate);
router.get('/universes', getAllUniverses);
router.get('/universes/:id', celebrate(universeIdSchema), getUniverseById);
router.post('/universes', celebrate(createUniverseSchema), createUniverse);
router.patch('/universes/:id', celebrate(updateUniverseSchema), updateUniverse);
router.delete('/universes/:id', celebrate(universeIdSchema), deleteUniverse);

export default router;
