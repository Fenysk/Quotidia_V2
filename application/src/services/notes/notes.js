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

        localStorage.setItem('notes', JSON.stringify(response.data));

        console.log('Notes retrieved :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};

export const searchNotes = async (search) => {
    try {
        console.log('Try to search notes :', search);
        const response = await axios.get(
            `${API_URL}/notes/search/${search}`,
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

export const getTodayNotes = async () => {
    try {
        console.log('Try to get today notes');
        const response = await axios.get(
            `${API_URL}/notes/today`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        localStorage.setItem('todayNotes', JSON.stringify(response.data));

        console.log('Today notes retrieved :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};

export const getNoteById = async (noteId) => {
    try {
        console.log('Try to get note');
        const response = await axios.get(
            `${API_URL}/notes/${noteId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log('Note retrieved :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};

export const setStateNote = async (noteId, state) => {
    try {
        console.log('Try to set state note');
        const response = await axios.patch(
            `${API_URL}/notes/${noteId}`,
            {
                state: state
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log('Note state set :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};

export const updateNote = async (note) => {
    try {
        console.log('Try to update note');
        const response = await axios.patch(
            `${API_URL}/notes/${note.id}`,
            {
                title: note.title,
                text: note.text
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log('Note updated :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error);
        throw new Error('Registration failed');
    }
};