import axios from 'axios';
import config from '../../config/config';

const API_URL = config.mode === 'development' ? config.API_URL_DEV : config.API_URL_PROD;

export const registerUser = async (username, email, password) => {
    try {
        console.log('Try to register...')
        const response = await axios.post(`${API_URL}/register`, {
            username: username,
            email: email,
            password: password
        });

        localStorage.setItem('token', response.data.token);

        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};

export const loginUser = async (email, password) => {
    try {
        console.log('Try to login...')
        const response = await axios.post(`${API_URL}/login`, {
            email: email,
            password: password
        });

        localStorage.setItem('token', response.data.token);

        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
    }
};