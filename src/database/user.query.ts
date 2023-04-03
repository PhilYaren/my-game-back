import prisma from './index';
import bcrypt from 'bcrypt';

export const getUser = async (id: number) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
};

export const createUser = async ({
  email,
  userName,
  password,
}: {
  email: string;
  userName: string;
  password: string;
}) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      email: email,
      userName: userName,
      password: hashedPassword,
    },
  });
};

export const getUserByUsername = async (userName: string) => {
  return await prisma.user.findFirst({
    where: {
      userName: userName,
    },
  });
};
