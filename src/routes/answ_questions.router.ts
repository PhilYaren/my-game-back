import express from 'express';
import {
  answQuest,
  correctAnswer,
  getQuestions,
} from '../database/answ_questions.query';

export const router = express.Router();

router.post('/:id', async (req, res) => {
  const { answer, gameId } = req.body;
  const id = parseInt(req.params.id);
  const playerId = req.session.user.id;
  let answered = false;
  try {
    const questionField = await correctAnswer(id);
    answered = questionField?.answer.toLowerCase() === answer.toLowerCase();
    const result = await answQuest(id, answered, gameId, playerId);
    res.json(result);
  } catch (err) {
    console.error(err);
  }
});

export default router;
