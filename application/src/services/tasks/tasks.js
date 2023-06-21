import axios from 'axios';
import config from '../../config/config';

const API_URL = config.mode === 'development' ? config.API_URL_DEV : config.API_URL_PROD;

export const setStateTask = async (taskId, state) => {
    try {
        console.log('Try to set state task');
        const response = await axios.patch(
            `${API_URL}/tasks/${taskId}`,
            {
                state: state
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log('Task state set :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};

export const checkTask = async (taskId) => {
    try {
        console.log('Try to check task');
        const response = await axios.patch(
            `${API_URL}/tasks/${taskId}`,
            {
                completedAt: new Date()
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log('Task checked :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};