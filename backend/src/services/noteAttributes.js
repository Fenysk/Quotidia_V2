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
    deadline.setHours(deadline.getHours() + (timezoneOffset / 60)); // On convertit en heure locale

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

export const addReminderDelayToNote = async (noteId, entry) => {
    const response = await askAttributeToOpenai(noteId, 'reminderDelay', entry);

    const functionCall = response.data.choices[0].message.function_call;
    const argumentsObject = JSON.parse(functionCall.arguments);
    const reminderDelay = argumentsObject.reminderDelay;

    console.log('Reminder delay :', reminderDelay);

    // Mise à jour de la note
    const updatedNoteWithReminderDelay = await prisma.note.update({
        where: {
            id: noteId,
        },
        data: {
            reminderDelay: reminderDelay,
        },
    });

    return updatedNoteWithReminderDelay;
};

export const addTasksToNote = async (noteId, entry) => {
    const response = await askAttributeToOpenai(noteId, 'tasks', entry);

    const functionCall = response.data.choices[0].message.function_call;
    console.log('Function :', functionCall);
    const argumentsObject = JSON.parse(functionCall.arguments);
    console.log('Arguments :', argumentsObject);
    const tasks = argumentsObject.tasks;

    console.log('Tasks :', tasks);

    tasks.forEach(async (task) => {
        // determine order number is the index of the task in the array
        const orderNumber = tasks.indexOf(task) + 1;
        console.log('orderNumber :', orderNumber);

        const newTask = await prisma.task.create({
            data: {
                noteId: noteId,
                task: task,
                orderNumber: orderNumber,
            },
        });

        console.log('Tâche créée :', newTask);
    });

    return tasks;
};