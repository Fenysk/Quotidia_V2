import { Configuration, OpenAIApi } from "openai";
import { updateUserOpenaiTokenUsage } from "../users/usersService.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const openaiChat = async (userId, message) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        { role: "system", content: "Say exactly 'OK'" },
        { role: "user", content: message }
      ],
    });

    let finalResponse = {};

    finalResponse.tokenCurrentUsed = response.data.usage.total_tokens;
    finalResponse.message = response.data.choices[0].message.content;
    finalResponse.tokenTotalUsed = await updateUserOpenaiTokenUsage(userId, finalResponse.tokenCurrentUsed);

    // Vérification du modèle et calcul du coût en fiat
    finalResponse.model = response.data.model;
    if (finalResponse.model.includes('gpt-3')) {
      finalResponse.fiatTotalSpent = finalResponse.tokenTotalUsed * 0.0000015;
    }
    else if (finalResponse.model.includes('gpt-4')) {
      finalResponse.fiatTotalSpent = finalResponse.tokenTotalUsed * 0.00003;
    }

    return finalResponse;

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to call OpenAI API');
  }
};



export const testOpenaiFunctions = async (userId, message) => {

  const messages = []

  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();

  currentDate.setHours(currentDate.getHours() + (timezoneOffset / 60));

  const promptSystem = `  
  {
    "context": {
      "role": "You're a machine that extracts information from user notes. No information should be invented, and all information should be entered! Correct any syntax errors. The createNote function is mandatory! NEVER reply to the user. A note cannot NEVER be both an event and a task. The note can be an event and have tasks. If the note contains tasks, the note is NEVER a task.",
      "currentDate": "${currentDate.toISOString()}",
      "currentWeekday": "${currentDate.toLocaleDateString('en-US', { weekday: 'long' })}"
    }
  }
  `;

  const promptUser = message;


  messages.push({ role: "system", content: promptSystem });

  // const promptExamples = {};
  // prompts.push(promptExamples);

  messages.push({ role: "user", content: promptUser });

  const functions = [
    {
      name: 'createNote',
      description: 'Créer une note',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Titre de la note'
          },
          text: {
            type: 'string',
            description: 'Texte de la note'
          },
          isEvent: {
            type: 'boolean',
            description: 'La note est-elle un événement ?'
          },
          isTask: {
            type: 'boolean',
            description: 'La note est-elle une tâche ?'
          },
          hasTasks: {
            type: 'boolean',
            description: 'La note contient-elle des tâches ?'
          }
        },
        required: ['title', 'isEvent', 'isTask', 'hasTasks']
      },
    }
  ];

  console.log('messages:', messages);
  console.log('functions:', functions);

  try {
    // Envoi la saisie à OpenAI pour obtenir les fonctions à exécuter
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: messages,
      functions: functions,
      function_call: 'auto',
      temperature: 0.5,
    });

    console.log('Réponse d\'OpenAI reçue :\n\n', response.data.choices[0].message);
    return response.data;

  } catch (error) {

    console.error('Error testing OpenAI:', error);
    throw new Error('Failed to test OpenAI');

  }
};


















export const askAttributeToOpenai = async (userId, attribute, taskOrEvent) => {


  const messages = []

  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setHours(currentDate.getHours() + (timezoneOffset / 60)); // On convertit en heure locale

  let promptSystem = ``;
  let functions = [];

  if (attribute === 'deadline') {
    promptSystem = `  
    {
      "context": {
        "role": "You receive a task or event from the user, your goal is to determine the referenced deadline. Consider the current time and date. If the time has already passed, consider tomorrow.",
        "currentDate": "${currentDate.toISOString()}",
        "currentWeekday": "${currentDate.toLocaleDateString('fr-FR', { weekday: 'long' })}",
      }
    }
    `;

    functions = [
      {
        name: 'addDeadlineToNote',
        description: 'Ajouter une deadline à la note',
        parameters: {
          type: 'object',
          properties: {
            deadline: {
              type: 'string',
              description: 'Date de la deadline au format ISO 8601 UTC-Z'
            },
          },
          required: ['deadline']
        },
      }
    ];
  } else if (attribute === 'reminderDelay') {
    promptSystem = `You receive a task or event from the user, your goal is to determine the referenced reminder delay.`;

    functions = [
      {
        name: 'addReminderDelayToNote',
        description: 'Ajouter une estimation de délai de rappel à la note',
        parameters: {
          type: 'object',
          properties: {
            reminderDelay: {
              type: 'number',
              description: 'Estimation du délai de rappel en minutes. Le délai peut aller jusqu\'à 1 mois. Exemple : si le rappel doit être executé 2 jours avant, la valeur sera 2880.'
            },
          },
          required: ['reminderDelay']
        }
      }
    ];
  } else if (attribute === 'tasks') {
    promptSystem = `You receive a note from the user, your goal is to determine the referenced tasks. Sort them in order.`;

    functions = [
      {
        name: 'addTasksToNote',
        description: 'Ajouter des tâches à la note',
        parameters: {
          type: 'object',
          properties: {
            tasks: {
              type: 'string',
              description: 'Liste des tâches à ajouter à la note sous forme de tableau (C\'EST IMPORTANT) exemple : ["Tâche 1", "Tâche 2", "Tâche 3"]'
            },
          },
          required: ['tasks']
        }
      }
    ];
  }

  const promptUser = taskOrEvent;


  messages.push({ role: "system", content: promptSystem });
  messages.push({ role: "user", content: promptUser });

  console.log('messages:', messages);
  console.log('functions:', functions);

  try {
    // Envoi la saisie à OpenAI pour obtenir les fonctions à exécuter
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: messages,
      functions: functions,
      function_call: 'auto',
      temperature: 0.5,
    });

    return response;

  } catch (error) {

    console.error('Error testing OpenAI:', error);
    throw new Error('Failed to test OpenAI');

  }

};