import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new Error('Failed to retrieve users');
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    throw new Error('Failed to retrieve user by ID');
  }
};

export const createUser = async (data) => {
  try {
    const user = await prisma.users.create({ data });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (id, data) => {
  try {
    const user = await prisma.users.update({ where: { id }, data });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await prisma.users.delete({ where: { id } });
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};