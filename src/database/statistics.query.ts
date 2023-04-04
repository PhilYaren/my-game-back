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
