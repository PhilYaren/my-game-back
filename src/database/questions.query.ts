import prisma from './index';

export const getQuestions = async (categoryId: number) => {
    return await prisma.question.findMany({
        where: {
            categoryId,
        }
    })
}

getQuestions(2).then(el => console.log(el));
