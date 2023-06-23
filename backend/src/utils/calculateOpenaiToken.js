import pricing from "../config/config.js";

export const calculateOpenaiResponseCost = (model, prompt_tokens, completion_tokens) => {

    let inputCost = 0;
    let outputCost = 0;

    if (model.includes('gpt-3')) { // Si le modèle contient gpt-3
        inputCost = pricing.GPT35turbo.input.standard * prompt_tokens / 1000;
        outputCost = pricing.GPT35turbo.output.standard * completion_tokens / 1000;
    }
    else if (model.includes('gpt-4')) { // Si le modèle contient gpt-4
        inputCost = pricing.GPT4.input.standard * prompt_tokens / 1000;
        outputCost = pricing.GPT4.output.standard * completion_tokens / 1000;
    }

    const totalCost = inputCost + outputCost;
    console.log('TotalCost : ', totalCost, '$');
    
    return totalCost;
};