import axios from 'axios';
import config from '../../config/config';

const API_URL = config.mode === 'development' ? config.API_URL_DEV : config.API_URL_PROD;

export const saveEntryToLocalStorage = (entry) => {
    try {
        let entries = [];

        if (localStorage.getItem('entries')) { // Si des entrées sont déjà présentes dans le localStorage
            entries = JSON.parse(localStorage.getItem('entries')); // alors on récupère les récupère
        }

        entries.push(entry); // On ajoute la nouvelle entrée
        localStorage.setItem('entries', JSON.stringify(entries)); // On sauvegarde le tout dans le localStorage

        return entries;

    } catch (error) {
        console.error('Error treating entry:', error);
        throw new Error('Failed to treat entry');
    }
};

export const getEntriesFromLocalStorage = () => {
    try {
        let entries = [];

        if (localStorage.getItem('entries')) { // Si des entrées sont déjà présentes dans le localStorage
            entries = JSON.parse(localStorage.getItem('entries')); // alors on récupère les récupère
        }

        return entries;

    } catch (error) {
        console.error('Error getting entries:', error);
        throw new Error('Failed to get entries');
    }
};



export const treatEntry = async (entry) => {
    try {
        const userToken = localStorage.getItem('token');

        console.log('Try to treat entry :', entry);
        const response = await axios.post(
            `${API_URL}/quickEntry`,
            {
                entry: entry
            },
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                }
            }
        );

        console.log('Entry treated successful :\n', response.data);
        return response;

    } catch (error) {
        console.error('Error treating entry:', error);
        throw new Error('Failed to treat entry');
    }

};

export const treatEntries = async () => {
    try {

        console.log('Try to treat entries...');
        const entries = getEntriesFromLocalStorage();
        entries.forEach(async (entry) => {

            const response = await treatEntry(entry);
            console.log('Response : ', response);

        });

    } catch (error) {
        console.error('Error treating entries:', error);
        throw new Error('Failed to treat entries');
    }
};