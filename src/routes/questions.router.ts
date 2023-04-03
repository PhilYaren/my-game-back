import express from 'express';
import { getQuestions } from '../database/questions.query'

const router = express.Router();

router.post('/blabla', async (req, res) => {
    const { categoryId } = req.body;
    try {
        const result = await getQuestions(categoryId);
    } catch(err) {
        console.error(err)
    }
})
