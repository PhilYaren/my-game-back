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
    data: {},
  });
  console.log({ pavel, svyat });
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
