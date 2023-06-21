import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNotes = async (userId) => {
    try {
        const notes = await prisma.note.findMany({
            where: {
                userId,
                state: null // On ne récupère que les notes n'étant pas supprimées ni archivées
            },
            include: {
                Task: true // On inclut les tâches associées à la note
            }
        });

        const notesRenamed = notes.map(note => { // On renomme 'Task' en 'tasks'
            return {
                ...note,
                tasks: note.Task,
                Task: undefined
            };
        });

        console.log('notes:', notesRenamed);
        return notesRenamed;
    } catch (error) {
        console.error('Error retrieving notes:', error);
        throw new Error('Failed to retrieve notes');
    }
};

export const getNoteById = async (userId, noteId) => {
    try {
        const note = await prisma.note.findUnique({ where: { userId_noteId: { userId, noteId } } });
        return note;
    } catch (error) {
        console.error('Error retrieving note by ID:', error);
        throw new Error('Failed to retrieve note by ID');
    }
};

export const createNoteFromEntry = async (userId, functionArguments) => {
    try {
        // On sépare les arguments de la fonction
        const { title, text } = functionArguments;

        console.log('title:', title);
        console.log('text:', text);

        const note = await prisma.note.create({
            data: {
                userId,
                title,
                text
            }
        });
        return note;
    } catch (error) {
        console.error('Error creating note from entry:', error);
        throw new Error('Failed to create note from entry');
    }
};

export const updateNote = async (userId, noteId, noteData) => {
    try {
        const note = await prisma.note.update({
            where: { id: noteId },
            data: noteData
        });
        return note;
    } catch (error) {
        console.error('Error updating note:', error);
        throw new Error('Failed to update note');
    }
};

export const deleteNote = async (userId, noteId) => {
    try {
        const note = await prisma.note.delete({ where: { userId_noteId: { userId, noteId } } });
        return note;
    } catch (error) {
        console.error('Error deleting note:', error);
        throw new Error('Failed to delete note');
    }
};