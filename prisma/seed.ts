import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);
  const pavel = await prisma.user.create({
    data: {
      email: 'popa@poteryana.net',
      userName: 'Pavel',
      password: password,
    },
  });

  const svyat = await prisma.user.create({
    data: {
      email: 'zabral@ochko.da',
      userName: 'Svyat',
      password: password,
    },
  });
  const game = await prisma.game.create({
    data: {
      name: 'Game 1',
      userId: pavel.id,
      categories: {
        create: [
          {
            name: 'Category 1',
            questions: {
              create: [
                {
                  text: 'Question 1',
                  answer: 'Answer 1',
                  score: 100,
                },
                {
                  text: 'Question 2',
                  answer: 'Answer 2',
                  score: 200,
                },
                {
                  text: 'Question 3',
                  answer: 'Answer 3',
                  score: 300,
                },
                {
                  text: 'Question 4',
                  answer: 'Answer 4',
                  score: 400,
                },
                {
                  text: 'Question 5',
                  answer: 'Answer 5',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'Category 2',
            questions: {
              create: [
                {
                  text: 'Question 1',
                  answer: 'Answer 1',
                  score: 100,
                },
                {
                  text: 'Question 2',
                  answer: 'Answer 2',
                  score: 200,
                },
                {
                  text: 'Question 3',
                  answer: 'Answer 3',
                  score: 300,
                },
                {
                  text: 'Question 4',
                  answer: 'Answer 4',
                  score: 400,
                },
                {
                  text: 'Question 5',
                  answer: 'Answer 5',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'Category 3',
            questions: {
              create: [
                {
                  text: 'Question 1',
                  answer: 'Answer 1',
                  score: 100,
                },
                {
                  text: 'Question 2',
                  answer: 'Answer 2',
                  score: 200,
                },
                {
                  text: 'Question 3',
                  answer: 'Answer 3',
                  score: 300,
                },
                {
                  text: 'Question 4',
                  answer: 'Answer 4',
                  score: 400,
                },
              ],
            },
          },
        ],
      },
    },
  });
  const statistics = await prisma.statistics.create({
    data: {
      userId: svyat.id,
      gameId: game.id,
      score: 1000,
    },
  });

  console.log({ pavel, svyat });
  console.log({ game });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
