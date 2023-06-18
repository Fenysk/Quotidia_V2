import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiChat = async (message) => {
  try {
    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Say exactly 'OK'" },
          { role: "user", content: message }
      ],
    });

    const response = chat_completion.data.choices[0].message.content;

    console.log('OpenAI chat successful:', response);

    return response;

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to call OpenAI API');
  }
};

export { openaiChat };