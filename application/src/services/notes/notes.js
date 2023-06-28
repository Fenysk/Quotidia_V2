import axios from 'axios';
import config from '../../config/config';
import { filteredNotes } from '../../utils/filter';

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

        const notes = filteredNotes(response.data, '', 'recent', [], []);

        localStorage.setItem('notes', JSON.stringify(notes));

        console.log('Notes retrieved :\n', notes);
        return notes;
    } catch (error) {
        console.error('getNotes failed:', error);
        throw new Error('getNotes failed');
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
        console.error('getTodayNotes failed:', error);
        throw new Error('getTodayNotes failed');
    }
};

export const getNotesWithDeadline = async (currentDate) => {
    try {
        console.log('Try to get notes with deadline');
        const response = await axios.post(
            `${API_URL}/notes/deadline`,
            {
                currentDate: currentDate
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        // trier les notes par date de deadline
        response.data.sort((a, b) => {
            if (a.deadlineAt < b.deadlineAt) {
                return -1;
            }
            if (a.deadlineAt > b.deadlineAt) {
                return 1;
            }
            return 0;
        });

        return response.data;
    } catch (error) {
        console.error('getNotesWithDeadline failed:', error);
        throw new Error('getNotesWithDeadline failed');
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
        console.error('getNoteById failed:', error);
        throw new Error('getNoteById failed');
    }
};

export const createNote = async () => {
    try {
        console.log('Try to create note');
        const response = await axios.post(
            `${API_URL}/notes`,
            {
                title: 'Note du ' + new Date().toLocaleDateString(),
                text: 'Texte de la note'
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        console.log('Note created :\n', response.data);
        return response.data;
    } catch (error) {
        console.error('createNote failed:', error);
        throw new Error('createNote failed');
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
        console.error('setStateNote failed:', error);
        throw new Error('setStateNote failed');
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
        console.error('updateNote failed:', error);
        throw new Error('updateNote failed');
    }
};