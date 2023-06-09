import express from 'express';
import {
  leaderboard,
  getStatistics,
  generateStatistics,
} from '../database/statistics.query';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await leaderboard();
    return res.json(result);
  } catch (e: any) {
    console.log(e.message);
    res.json({ message: 'Internal server error' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const result = await getStatistics(req.session.user.id);
    return res.json(result);
  } catch (e: any) {
    console.log(e.message);
    res.json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { gameId } = req.body;
    const result = await generateStatistics(req.session.user.id, gameId);
    return res.json(result);
  } catch (e: any) {
    console.log(e.message);
    res.json({ message: 'Internal server error' });
  }
});

export default router;
