import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const registerUser = async (username, email, password) => {
    try {
        console.log('Try to register...')
        const response = await axios.post(`${API_URL}/register`, {
            username: username,
            email: email,
            password: password
        });

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
        
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
    }
};