import { PrismaClient } from '@prisma/client';
import { testOpenaiFunctions } from '../openai/openaiService.js';
import { createNoteFromEntry } from '../notes/notesService.js';

const prisma = new PrismaClient();

export const treatEntry = async (userId, entry) => {
    try {
        // 1. On récupère les différents attributs via l'API OpenAI
        const openaiResponse = await testOpenaiFunctions(userId, entry);
        const functionCall = openaiResponse.choices[0].message.function_call;

        const functionArgs = JSON.parse(functionCall.arguments);
        console.log('Function :', functionCall);
        console.log('Arguments :', functionArgs);

        // 2. On vérifie si c'est une question ou non
        if (functionArgs.isQuestion === false) {

            // 3. Si ce n'est pas une question, on crée la note
            const noteConfirmation = await createNoteFromEntry(userId, functionArgs);

            console.log('Note créée :', noteConfirmation);

            // 4. On execute les demandes des arguments
            if (functionArgs.isEvent || functionArgs.isTask) {
                console.log('isEvent ou isTask');
            }
            if (functionArgs.hasTasks) {
                console.log('hasTasks');
            }

        } else {

            // 3. Si c'est une question, on la traite
            console.log('isQuestion');
            return 'isQuestion';
        }

        return noteConfirmation;

    } catch (error) {
        console.error('Error retrieving entry:', error);
        throw new Error('Failed to retrieve entry');
    }
};