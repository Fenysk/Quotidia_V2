<template>
    <div class="
    quickEntry
    border-solid border-2 border-gray-400
    p-4 m-4
    ">
        <p>Qu'avez-vous en tête ?</p>
        <form @submit.prevent="submitEntry">
            <textarea type="text" v-model="userInput" />
            <button type="submit">Envoyer</button>
        </form>
        <div v-for="entry in entries" :key="entry">
            <p>{{ entry }}</p>
        </div>
    </div>
</template>

<script>
import { saveEntryToLocalStorage, getEntriesFromLocalStorage, treatEntry, treatEntries } from '../../services/quickEntry/quickEntry'
export default {
    name: 'QuickEntry',

    data() {
        return {
            userInput: '',
            entries: []
        }
    },

    methods: {
        submitEntry() {

            // Si l'entrée n'est pas vide
            if (this.userInput !== '') {

                saveEntryToLocalStorage(this.userInput); // On sauvegarde l'entrée dans le local storage

                treatEntry(this.userInput); // On traite les entrées

                this.userInput = '';
            }

        }
    },

    mounted() {
        // this.entries = getEntriesFromLocalStorage(); // On récupère les entrées du local storage

        //TODO: Vérifier si les entrées n'ont pas déjà été traitées avant de les traiter

        if (this.entries.length > 0) {
            treatEntries(); // alors on les traite
        }
    },
}
</script>