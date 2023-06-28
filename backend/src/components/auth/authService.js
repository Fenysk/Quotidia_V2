import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../utils/tokenUtils.js';

import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        openaiCost: 0,
      },
    });

    const tags = await prisma.tag.createMany({
      data: [
        {
          userId: user.id,
          label: 'Projets',
          color: 'debe1f',
        },
        {
          userId: user.id,
          label: 'Idées',
          color: '1fde35',
        },
        {
          userId: user.id,
          label: 'Citations',
          color: '1f62de',
        }
      ],
    });

    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
};

export const loginUser = async (username, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Login failed');
  }
};
