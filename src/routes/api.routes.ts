import express from 'express';
import authRoutes from './auth.routes';
import gameRoutes from './games.routes';
import usersRoutes from './users.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/games', gameRoutes);

export default router;
