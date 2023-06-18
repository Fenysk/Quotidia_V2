import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt'; // Permet de crypter le mot de passe

const prisma = new PrismaClient();

export const registerUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
};

export const loginUser = async (username, password) => {
  try {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Login failed');
  }
};