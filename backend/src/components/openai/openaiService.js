import { Configuration, OpenAIApi } from "openai";
import { updateUserOpenaiTokenUsage } from "../users/usersService.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

let model = 'gpt-3.5-turbo-0613';

export const openaiChat = async (userId, message) => {
  try {
    const response = await openai.createChatCompletion({
      model: model,
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
      "role": "You are a machine tasked with extracting information from user notes. Your goal is to extract accurate information without inventing any details.

      Instructions:
      1. Correct the syntax errors.
      2. All the information should be entered.
      3. Never reply to the user. Your role is solely to extract information from the notes.
      4. A note can never be both an event and a task simultaneously.
      5. If a note contains tasks, itself never is a task.
      6. If a note is event, it can contains tasks.
      
      Remember to adhere to these guidelines when processing user notes.",
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
          },
          hasLocation: {
            type: 'boolean',
            description: 'La note contient-elle une localisation ?'
          }
        },
        required: ['title', 'isEvent', 'isTask', 'hasTasks', 'hasLocation']
      },
    }
  ];

  const function_call = { "name": "createNote" };

  console.log('messages:', messages);
  console.log('functions:', functions);

  model = 'gpt-3.5-turbo-0613';

  try {
    // Envoi la saisie à OpenAI pour obtenir les fonctions à exécuter
    const response = await openai.createChatCompletion({
      model: model,
      messages: messages,
      functions: functions,
      function_call: function_call,
      temperature: 0.5,
    });

    console.log('Réponse d\'OpenAI reçue :\n\n', response.data.choices[0].message);
    return response.data;

  } catch (error) {

    console.error('Error testing OpenAI:', error);
    throw new Error('Failed to test OpenAI');

  }
};


















export const askAttributeToOpenai = async (noteId, attribute, taskOrEvent) => {


  const messages = []

  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setHours(currentDate.getHours() + (timezoneOffset / 60)); // On convertit en heure locale

  let promptSystem = ``;
  let functions = [];
  let function_call = {};

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

    function_call = { "name": "addDeadlineToNote" };

    model = 'gpt-4-0613';

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

    function_call = { "name": "addReminderDelayToNote" };

    model = 'gpt-3.5-turbo-0613';

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

    function_call = { "name": "addTasksToNote" };

    model = 'gpt-3.5-turbo-0613';

  } else if (attribute === 'tags') {
    // const tags = await getTagsByUserId(userId);
    const tags = [
      { "id": 1, "label": "Projets" },
      { "id": 2, "label": "Idées" },
      { "id": 3, "label": "Citations" }
    ];

    // stringify tags
    const tagsStringified = JSON.stringify(tags);

    console.log('tagsStringified:', tagsStringified);

    promptSystem = `
    Role: You are an engine tasked with determining the IDs of referenced tags from a given list of tags. Your goal is to process the user's note and extract the tag IDs. Remember not to invent any tags. Expected format : [number, number].
    TagsListAvailable: ${tagsStringified} (Don\'t invent tagId !!!)
    `;

    functions = [
      {
        name: 'addTagsToNote',
        description: 'Ajouter des tags à la note',
        parameters: {
          type: 'object',
          properties: {
            tags: {
              type: 'string',
              description: 'Tags array like this: [number, number] (0, 1 or 2 tags maximum. Don\'t invent tagId !!!)'
            }
          },
          required: ['tags']
        }
      }
    ];

    function_call = { "name": "addTagsToNote" };

    model = 'gpt-3.5-turbo-0613';

  } else if (attribute === 'location') {
    promptSystem = `You receive a note from the user, your goal is to determine the referenced location.`;

    functions = [
      {
        name: 'addLocationToNote',
        description: 'Ajouter une localisation à la note',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'Localisation à ajouter à la note'
            },
          },
          required: ['location']
        }
      }
    ];

    function_call = { "name": "addLocationToNote" };

    model = 'gpt-3.5-turbo-0613';

  } else if (attribute === 'importance') {
    promptSystem = `You receive a task or event from the user, your goal is to determine the importance of the note between 1 and 3. (1 = low, 2 = medium, 3 = high). Exemples : a rendez-vous is important, a task to wash the car is neutral, a task to play video games is not important.`;

    functions = [
      {
        name: 'addImportanceToNote',
        description: 'Ajouter une importance à la note',
        parameters: {
          type: 'object',
          properties: {
            importance: {
              type: 'number',
              description: 'Importance de la note entre 1 et 3. (1 = low, 2 = medium, 3 = high)'
            },
          },
          required: ['importance']
        }
      }
    ];

    function_call = { "name": "addImportanceToNote" };

    model = 'gpt-3.5-turbo-0613';

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
      function_call: function_call,
      temperature: 0.5,
    });

    return response;

  } catch (error) {

    console.error('Error testing OpenAI:', error);
    throw new Error('Failed to test OpenAI');

  }

};