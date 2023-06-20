import { PrismaClient } from '@prisma/client';
import { testOpenaiFunctions } from '../openai/openaiService.js';
import { createNoteFromEntry } from '../notes/notesService.js';
import { addDeadlineToNote } from '../../services/noteAttributes.js';

const prisma = new PrismaClient();

export const treatEntry = async (userId, entry) => {
    try {
        // 1. On récupère les différents attributs via l'API OpenAI
        const openaiResponse = await testOpenaiFunctions(userId, entry);

        const functionCall = openaiResponse.choices[0].message.function_call;

        const functionArgs = JSON.parse(functionCall.arguments);
        console.log('Function :', functionCall);
        console.log('Arguments :', functionArgs);

        // 2. On crée la note
        const noteConfirmation = await createNoteFromEntry(userId, functionArgs);

        console.log('Note créée :', noteConfirmation);

        // 3. On execute les demandes des arguments
        if (functionArgs.isEvent || functionArgs.isTask) {
            console.log('isEvent ou isTask');

            const updatedNote = await addDeadlineToNote(noteConfirmation.id, entry);
            console.log('Note à jour :', updatedNote);

        }
        if (functionArgs.hasTasks) {
            console.log('hasTasks');
        }

        return noteConfirmation;


    } catch (error) {
        console.error('Error retrieving entry:', error);
        throw new Error('Failed to retrieve entry');
    }
};