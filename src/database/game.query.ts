import prisma from './index';

export const getAllGames = async (userId: number) => {
  return prisma.game.findMany({
    include: {
      categories: {
        include: {
          questions: true,
        },
      },
      answeredQuestions: {
        where: {
          playerId: userId,
        },
      },
    },
  });
};

export const getGame = async (id: string, userId: number) => {
  return prisma.game.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      categories: {
        include: {
          questions: true,
        },
      },
      answeredQuestions: {
        where: {
          playerId: userId,
        },
      },
    },
  });
};
