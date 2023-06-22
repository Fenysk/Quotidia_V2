<template>
    <div class="quickEntry
    fixed bottom-0 right-0
    min-h-16 w-screen
    bg-gray-800
    m-0 p-0
    flex flex-row items-center justify-between
    touch-none
    ">
        <textarea
        @keydown.enter.prevent="submitEntry"
        placeholder="Qu'avez-vous en tête ?"
        v-model="quickEntryInput" class="
            inline-block
            h-16 w-4/5
            bg-transparent
            px-4 py-2
            placeholder:italic placeholder:text-slate-400 resize-none
            text-white
        " />
        <button @click="console.log('quickEntryInput')" class="
            inline-block
            h-16 w-1/5
            bg-slate-700 text-white font-semibold
        ">
            Enregistrer
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { saveEntryToLocalStorage, treatEntry } from '../services/quickEntry/quickEntry.js';

const quickEntryInput = ref('')
const quickEntries = ref([]);

const submitEntry = async () => {

    saveEntryToLocalStorage(quickEntryInput.value); // On sauvegarde l'entrée dans le local storage
    treatEntry(quickEntryInput.value); // On traite les entrées
    quickEntryInput.value = '';

}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.quickEntry {
    min-height: $headerHeight;
}
</style>
