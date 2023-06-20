import { PrismaClient } from '@prisma/client';
import { testOpenaiFunctions } from '../openai/openaiService.js';
import { createNoteFromEntry } from '../notes/notesService.js';

const prisma = new PrismaClient();

export const treatEntry = async (userId, entry) => {
    try {

        // 1. On demande à OpenAI les fonctions à executer

        const response = await testOpenaiFunctions(userId, entry);
        const functions = response.choices[0].message.function_call;

        console.log('Functions :', functions);
        
        const functionName = functions.name;
        const functionArguments = JSON.parse(functions.arguments);

        // 2. On execute les fonctions

        if (functionName === 'createNote') {
            const confirmation = createNoteFromEntry(userId, functionArguments);
            return confirmation;
        }

    } catch (error) {
        console.error('Error retrieving entry:', error);
        throw new Error('Failed to retrieve entry');
    }
};