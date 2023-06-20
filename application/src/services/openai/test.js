import axios from 'axios';
import config from '../../config/config';

const API_URL = config.mode === 'development' ? config.API_URL_DEV : config.API_URL_PROD;

export const openaiTest1 = async (message) => {
    try {
        const userToken = localStorage.getItem('token');

        console.log('Try to test (1) openai...')
        const response = await axios.post(
            `${API_URL}/openai/chat`,
            { message: message },
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                }
            }
        );

        console.log('OpenAI test successful :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Error testing OpenAI:', error);
        throw new Error('Failed to test OpenAI');
    }
};

export const testOpenaiFunctions = async (message) => {
    try {
        const userToken = localStorage.getItem('token');

        console.log('Try to test (2) openai...')
        const response = await axios.post(
            `${API_URL}/openai/functionsTest`,
            { message: message },
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                }
            }
        );

        console.log('OpenAI test successful :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Error testing OpenAI:', error);
        throw new Error('Failed to test OpenAI');
    }
};