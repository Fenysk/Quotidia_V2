<template>
    <div class="quickEntry
    fixed bottom-0 left-0
    lg:relative
    w-screen
    bg-gray-800
    m-0 p-0
    flex flex-row items-center justify-between
    touch-none
    ">
        <textarea @keydown.enter.prevent="submitEntryIfCombination" placeholder="Qu'avez-vous en tête ?"
            v-model="quickEntryInput" class="
            inline-block
            h-16 w-4/5
            bg-transparent
            px-4 py-2
            placeholder:italic placeholder:text-slate-400 resize-none
            text-white
        " />
        <button @click="submitEntry" class="
            inline-block
            h-16 w-1/5
            bg-slate-700 text-white font-semibold
        ">
            Enregistrer
        </button>
    </div>
</template>

<script>
import { saveEntryToLocalStorage, treatEntry } from '../services/quickEntry/quickEntry.js';

export default {
    name: 'QuickEntry',

    data() {
        return {
            quickEntryInput: '',
            quickEntries: []
        }
    },

    methods: {
        submitEntryIfCombination(event) {
            if (event.ctrlKey && event.key === 'Enter') {
                this.submitEntry();
            }
        },
        
        submitEntry() {
            if (this.quickEntryInput !== '' && this.quickEntryInput.length > 3) {

                saveEntryToLocalStorage(this.quickEntryInput); // On sauvegarde l'entrée dans le local storage
                treatEntry(this.quickEntryInput); // On traite les entrées
                this.quickEntryInput = '';

            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.quickEntry {
    height: $headerHeight;
}
</style>
