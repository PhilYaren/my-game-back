import prisma from './index';

export const getQuestions = async (categoryId: number) => {
  return prisma.question.findMany({
    where: {
      categoryId,
    },
  });
};

export const currectAnswer = async (id: number) => {
  return prisma.question.findFirst({
    where: {
      id,
    },
  });
};

export const answQuest = async (
  id: number,
  answered: boolean,
  gameId: number,
  playerId: number
) => {
  return prisma.answeredQuestions.create({
    data: {
      answered,
      gameId,
      questionId: id,
      playerId,
    },
  });
};

getQuestions(2).then((el) => console.log(el));
