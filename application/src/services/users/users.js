import axios from 'axios';
import config from '../../config/config';

const API_URL = config.mode === 'development' ? config.API_URL_DEV : config.API_URL_PROD;

export const getCurrentUser = async () => {
    try {
        console.log('Try to get user by id...')
        const response = await axios.get(
            `${API_URL}/user`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        localStorage.setItem('user', JSON.stringify(response.data));

        console.log('Get user by id successful:', response.data);
        return response.data;

    } catch (error) {
        console.error('Get user by id failed:', error);
        throw new Error('Get user by id failed');
    }
};