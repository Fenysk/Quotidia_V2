import axios from 'axios';
import config from '../../config/config';

const API_URL = config.mode === 'development' ? config.API_URL_DEV : config.API_URL_PROD;

export const getNotes = async () => {
    try {
        console.log('Try to get notes');
        const response = await axios.get(
            `${API_URL}/notes`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log('Notes retrieved :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};