import { Router } from 'express';

import { getAllUsers, getUserById } from '../controllers/usersController.js';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

export default router;
