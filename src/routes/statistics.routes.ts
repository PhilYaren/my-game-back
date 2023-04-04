import express from 'express';
import { leaderboard } from '../database/statistics.query';

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

export default router;
