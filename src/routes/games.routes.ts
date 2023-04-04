import express from 'express';
import { getAllGames, getGame, getScore } from '../database/game.query';
import isAuth from '../middlewares/isAuth';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const games = await getAllGames(userId);

    res.json(games);
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', isAuth, async (req, res): Promise<void> => {
  const { id } = req.params;
  try {
    const game = await getGame(id, req.session.user.id);
    res.json(game);
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/score/:id', isAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const score = await getScore(id, req.session.user.id);
    res.json(score);
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
