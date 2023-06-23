import { updateUserOpenaiCost } from "../components/users/usersService.js";
import { calculateOpenaiResponseCost } from "../utils/calculateOpenaiToken.js";

export const middlewareUseTokenOpenai = async (userId, response) => {
    try {

        const model = response.data.model;

        const prompt_tokens = response.data.usage.prompt_tokens;
        const completion_tokens = response.data.usage.completion_tokens;
        const totalUsedTokens = response.data.usage.total_tokens;


        console.log('Model : ', model);

        console.log('PromptTokens : ', prompt_tokens);
        console.log('CompletionTokens : ', completion_tokens);
        console.log('TotalUsedTokens : ', totalUsedTokens);


        const totalCost = calculateOpenaiResponseCost(model, prompt_tokens, completion_tokens);
        
        await updateUserOpenaiCost(userId, totalCost);

        return totalCost;

    } catch (error) {

        console.log(error);
        return error;

    }
};