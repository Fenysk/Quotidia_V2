import { askAttributeToOpenai } from "../components/openai/openaiService.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addDeadlineToNote = async (noteId, entry) => {
    const response = await askAttributeToOpenai(noteId, 'deadline', entry);
    
    // Transformer en date
    const functionCall = response.data.choices[0].message.function_call;
    const argumentsObject = JSON.parse(functionCall.arguments);
    const deadline = new Date(argumentsObject.deadline);

    // Appliquer changement de timezone
    const timezoneOffset = deadline.getTimezoneOffset();
    deadline.setHours(deadline.getHours() - (timezoneOffset / 60)); // On convertit en heure locale

    console.log('Deadline :', deadline);

    // Mise à jour de la note
    const updatedNoteWithDeadline = await prisma.note.update({
        where: {
            id: noteId,
        },
        data: {
            deadlineAt: deadline,
        },
    });

    return updatedNoteWithDeadline;
};