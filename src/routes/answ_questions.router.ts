import express from 'express';
import {answQuest, currectAnswer, getQuestions} from '../database/answ_questions.query'

export const router = express.Router();

router.post('/blabla', async (req, res) => {
    const { categoryId } = req.body;
    try {
        const result = await getQuestions(categoryId);
    } catch(err) {
        console.error(err)
    }
})

router.post('/keke', async(req, res) => {
    const { id, answer, gameId } = req.body;
    const playerId = req.session.user.id;
    let answered = false;
    try {
        const questionField = await currectAnswer(id);
        answered = questionField?.answer.toLowerCase() === answer.toLowerCase();
        const result = await answQuest(id, answered, gameId, playerId);
        res.json(result);
    } catch (err) {
        console.error(err);
    }
})
