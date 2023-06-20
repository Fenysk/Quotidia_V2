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

  currentDate.setHours(currentDate.getHours() - (timezoneOffset / 60));

  const promptSystem = `  
  {
    "context": {
      "role": "Tu es une machine qui reçois des saisies et tu dois attribuer les diverses informations à la note. Toutes les informations de la note doivent être renseignées ! Aucune information ne doit être inventée comme la deadline, ...!",
      "currentDate": "${currentDate.toISOString()}",
      "currentWeekday": "${currentDate.toLocaleDateString('fr-FR', { weekday: 'long' })}",
      "tagsAvailable": ["Idees", "Citations", "Travail"]
    }
  }
  `;

  const promptUser = message;


  console.log('promptUser :', promptUser);


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
        },
        required: ['title', 'text'],
      },
    }
  ];



  try {
    // Envoi la saisie à OpenAI pour obtenir les fonctions à exécuter
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: messages,
      functions: functions,
      function_call: 'auto',
      temperature: 0.5,
    });

    console.log('Réponse d\'OpenAI reçue !');
    return response.data;

  } catch (error) {

    console.error('Error testing OpenAI:', error);
    throw new Error('Failed to test OpenAI');

  }
};