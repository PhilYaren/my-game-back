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
