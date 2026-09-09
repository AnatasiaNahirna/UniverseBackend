import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserSchema,
  loginUserSchema,
  userIdSchema,
  updateUserSchema,
} from '../validations/userValidation.js';

import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/usersController.js';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users/register', celebrate(registerUserSchema), registerUser);
router.post('/users/login', celebrate(loginUserSchema), loginUser);
router.post('/users/logout', logoutUser);
router.patch('/users/:id', celebrate(updateUserSchema), updateUser);
router.delete('/users/:id', celebrate(userIdSchema), deleteUser);
router.post('/users/refresh-session', refreshUserSession);

export default router;
