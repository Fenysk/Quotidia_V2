<template>
    <div class="
    quickEntry
    border-solid border-2 border-gray-400
    p-4 m-4
    ">
        <p>Qu'avez-vous en tête ?</p>
        <form @submit.prevent="submitEntry">
            <input type="text" v-model="userInput" />
            <button type="submit">Envoyer</button>
        </form>
        <div v-for="entry in entries" :key="entry">
            <p>{{ entry }}</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getEntriesFromLocalStorage, saveEntryToLocalStorage, treatEntries, treatEntry } from '../services/quickEntry/quickEntry.js';

const userInput = ref('');
const entries = ref([]);

const submitEntry = async () => {

    saveEntryToLocalStorage(userInput.value); // On sauvegarde l'entrée dans le local storage
    entries.value = getEntriesFromLocalStorage(); // On récupère les entrées du local storage
    
    treatEntry(userInput.value); // On traite les entrées

    userInput.value = '';

}

onMounted(() => {
    entries.value = getEntriesFromLocalStorage(); // On récupère les entrées du local storage
    
    if (entries.value.length > 0) { // Si il y a des entrées
        treatEntries(); // alors on les traite
    }
})


</script>