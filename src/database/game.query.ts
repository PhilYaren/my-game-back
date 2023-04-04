import prisma from './index';

export const getAllGames = async (userId: number) => {
  return prisma.game.findMany({
    include: {
      categories: {
        include: {
          questions: {
            include: {
              answeredQuestions: {
                where: {
                  playerId: userId,
                },
              },
            },
          },
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
          questions: {
            include: {
              answeredQuestions: {
                where: {
                  playerId: userId,
                },
              },
            },
          },
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

export const getScore = async (id: string, userId: number) => {
  const answered = await prisma.answeredQuestions.findMany({
    where: {
      playerId: userId,
      gameId: parseInt(id),
    },
    include: {
      question: true,
    },
  });
  const score: { score: number } = {
    score: answered.reduce(
      (acc, cur) => acc + (cur.answered ? cur.question.score : 0),
      0
    ),
  };
  return score;
};
