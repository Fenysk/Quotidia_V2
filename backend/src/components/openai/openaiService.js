import { Configuration, OpenAIApi } from "openai";
import { updateUserOpenaiTokenUsage } from "../users/usersService.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiChat = async (userId, message) => {
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

export { openaiChat };