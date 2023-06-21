import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateTask = async (userId, taskId, taskData) => {
    try {
        const task = await prisma.task.update({
            where: { id: taskId },
            data: taskData
        });
        return task;
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Failed to update task');
    }
};

export const deleteTask = async (userId, taskId) => {
    try {
        const task = await prisma.task.delete({ where: { userId_taskId: { userId, taskId } } });
        return task;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Failed to delete task');
    }
};