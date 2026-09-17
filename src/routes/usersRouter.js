import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

import {
  registerUserSchema,
  loginUserSchema,
  userIdSchema,
  updateUserSchema,
  updateUserRoleSchema,
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
  currentUser,
  updateUsersRole,
  updateUserAvatar,
} from '../controllers/usersController.js';

const router = Router();

router.get('/users', authenticate, getAllUsers);
router.get('/users/current', authenticate, currentUser);
router.get('/users/:id', authenticate, getUserById);
router.delete('/users/:id', authenticate, celebrate(userIdSchema), deleteUser);
router.patch(
  '/users/:id/role',
  authenticate,
  celebrate(updateUserRoleSchema),
  updateUsersRole,
);

router.post('/users/register', celebrate(registerUserSchema), registerUser);
router.post('/users/login', celebrate(loginUserSchema), loginUser);
router.post('/users/logout', logoutUser);

router.patch(
  '/users/:id',
  authenticate,
  celebrate(updateUserSchema),
  updateUser,
);
router.patch(
  '/users/current/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

router.post('/users/refresh-session', refreshUserSession);

export default router;
