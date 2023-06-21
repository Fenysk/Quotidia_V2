import { testOpenaiFunctions } from '../openai/openaiService.js';
import { createNoteFromEntry } from '../notes/notesService.js';
import { addDeadlineToNote, addReminderDelayToNote, addTasksToNote, addTagsToNote, addLocationToNote } from '../../services/noteAttributes.js';

export const treatEntry = async (userId, entry) => {
    try {
        // 1. On récupère les différents attributs via l'API OpenAI
        const openaiResponse = await testOpenaiFunctions(userId, entry);

        const functionCall = openaiResponse.choices[0].message.function_call;

        const functionArgs = JSON.parse(functionCall.arguments);

        // 2. On crée la note
        const noteConfirmation = await createNoteFromEntry(userId, functionArgs);

        console.log('Note créée :', noteConfirmation);

        // 3. On execute les demandes des arguments

        if (functionArgs.hasTasks) {
            console.log('hasTasks');

            const updatedNoteWithTasks = addTasksToNote(noteConfirmation.id, entry);
            console.log('Note à jour :', updatedNoteWithTasks);
        }
        if (functionArgs.hasLocation) {
            console.log('hasLocation');

            const updatedNotewithLocation = addLocationToNote(noteConfirmation.id, entry);
            console.log('Note à jour :', updatedNotewithLocation);
        }
        
        if (functionArgs.isEvent || functionArgs.isTask) {
            console.log('isEvent ou isTask');

            const updatedNotewithDeadline = addDeadlineToNote(noteConfirmation.id, entry);
            console.log('Note à jour :', updatedNotewithDeadline);

            const updatedNoteWithReminderDelay = addReminderDelayToNote(noteConfirmation.id, entry);
            console.log('Note à jour :', updatedNoteWithReminderDelay);

        } else {
            console.log('isNote');

            const updatedNotewithTags = addTagsToNote(noteConfirmation.id, entry);
            console.log('Note à jour :', updatedNotewithTags);
        }

        return noteConfirmation;


    } catch (error) {
        console.error('Error retrieving entry:', error);
        throw new Error('Failed to retrieve entry');
    }
};