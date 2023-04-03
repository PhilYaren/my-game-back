import express from 'express';
import { getAllGames, getGame } from '../database/game.query';
import isAuth from '../middlewares/isAuth';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  try {
    // const games = await getAllGames(req.session.user.id);
    const games = await getAllGames(req.session.user.id);

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

export default router;
