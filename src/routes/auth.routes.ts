import express from 'express';
import { createUser, getUserByUsername } from '../database/user.query';
import bcrypt from 'bcrypt';
import isAuth from '../middlewares/isAuth';
import isUnLogged from '../middlewares/isUnLogged';

const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json(user);
  }
  res.status(401).json({ message: 'Unauthorized' });
});

router.post('/register', isUnLogged, (req, res) => {
  const { email, password, userName } = req.body;
  try {
    const user = createUser({ email, password, userName });
    if (user) {
      res.json(user);
      return;
    }
    res.status(400).json({ message: 'Bad request' });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', isUnLogged, async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await getUserByUsername(userName);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        req.session.user = user;
        res.json(user);
        return;
      }
      res.status(403).json({ message: 'Invalid password' });
    }
    res.status(404).json({ message: 'Not found' });
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/logout', isAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.clearCookie('auth');
    res.json({ message: 'Logged out' });
  });
});

export default router;
