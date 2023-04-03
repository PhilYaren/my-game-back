import express from 'express';
import { getUser } from '../database/user.query';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (user) {
      res.json(user);
      return;
    }
    res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
