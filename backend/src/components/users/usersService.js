import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new Error('Failed to retrieve users');
  }
};

export const getUserById = async (id) => {
  try {
    // get only the fields you need
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        openaiCost: true,
        Tag: { // Include the associated tags
          select: {
            id: true,
            label: true,
            color: true,
          },
        },
      },
    });

    const userRenamed = {
      ...user,
      tags: user.Tag,
      Tag: undefined,
    };

    console.log('user:', userRenamed);
    return userRenamed;
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    throw new Error('Failed to retrieve user by ID');
  }
};


export const updateUser = async (id, data) => {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};



// Permet de mettre à jour le nombre de tokens utilisés par l'utilisateur
export const updateUserOpenaiCost = async (id, openaiCost) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        openaiCost: {
          increment: openaiCost, // On incrémente le nombre de tokens utilisés
        },
      },
    });

    console.log('User openaiCost updated:', user.openaiCost);

    return user.openaiCost;
  } catch (error) {
    console.error('Error updating user openaiCost:', error);
    throw new Error('Failed to update user openaiCost');
  }
}