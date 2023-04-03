import prisma from './index';

export const getAllGames = async (userId: number) => {
  return await prisma.game.findMany({
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

getAllGames(2).then((games) => console.log(games));
