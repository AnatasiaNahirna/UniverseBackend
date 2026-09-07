import { Router } from 'express';

import {
  getAllUsers,
  getUserById,
  registerUser,
} from '../controllers/usersController.js';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', registerUser);

export default router;
