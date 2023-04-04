import express from 'express';
import authRoutes from './auth.routes';
import gameRoutes from './games.routes';
import usersRoutes from './users.routes';
import answQuest from './answ_questions.router';
import statisticsRoutes from './statistics.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/answers', answQuest);
router.use('/games', gameRoutes);
router.use('/statistics', statisticsRoutes);

export default router;
