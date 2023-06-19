import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const treatEntry = async (entry) => {
    try {
        console.log('Entry :', entry);
        return entry;
    } catch (error) {
        console.error('Error retrieving entry:', error);
        throw new Error('Failed to retrieve entry');
    }
};