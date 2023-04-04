import prisma from './index';

export async function leaderboard() {
  try {
    const leaderboard = await prisma.game.findMany({
      include: {
        statistics: {
          include: {
            user: true,
          },
        },
      },
    });
    return leaderboard;
  } catch (e: any) {
    console.log(e.message);
    return [];
  }
}

export async function getStatistics(userId: number) {
  try {
    return prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        statistics: {
          include: {
            game: true,
          },
        },
      },
    });
  } catch (e: any) {
    console.log(e.message);
    return { message: 'Internal server error' };
  }
}

export async function generateStatistics(userId: number, gameId: number) {
  try {
    const answeredQuestions = await prisma.answeredQuestions.findMany({
      where: {
        playerId: userId,
        gameId,
      },
      include: {
        question: true,
      },
    });
    const score = answeredQuestions.reduce((acc, curr) => {
      return acc + (curr.answered ? curr.question.score : 0);
    }, 0);
    prisma.answeredQuestions.deleteMany({
      where: {
        playerId: userId,
        gameId,
      },
    });
    const statistics = await prisma.statistics.create({
      data: {
        score,
        gameId,
        userId,
      },
    });
    return statistics;
  } catch (e: any) {
    console.log(e.message);
    return { message: 'Internal server error' };
  }
}
