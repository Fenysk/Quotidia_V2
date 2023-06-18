import axios from 'axios';
import config from '../../config/config';

const API_URL = config.mode === 'development' ? config.API_URL_DEV : config.API_URL_PROD;

export const openaiTest = async (message) => {
    try {
        console.log('Try to test openai...')
        const response = await axios.post(`${API_URL}/openai/chat`, {
            message: message
        });

        console.log('OpenAI test successful :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Error testing OpenAI:', error);
        throw new Error('Failed to test OpenAI');
    }
};