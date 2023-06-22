<template>
    <div class="quickEntry
    fixed bottom-0 right-0
    min-h-16 w-screen
    bg-gray-800
    ">
        <textarea placeholder="Qu'avez-vous en tête ?" v-model="quickEntryInput" class="
            bg-transparent
            w-full h-full px-4 py-2
            placeholder:italic placeholder:text-slate-400
            text-white
        " />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const quickEntryInput = ref('')
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.quickEntry {
    min-height: $headerHeight;
}
</style>