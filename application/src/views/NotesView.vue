<template>
    <div id="notes">
        <ul class="
        p-2 mt-4
        flex flex-wrap gap-4
        items-center justify-center
        overflow-y-auto
        ">
            <li v-for="note in notes" :key="note.id">
                <NoteMiniature :note="note" />
            </li>
        </ul>

        <p class="mt-16 pb-32">{{ notes[9] }}</p>
    </div>
</template>

<script setup>
import NoteMiniature from '../components/Notes/NoteMiniature.vue'

import { onMounted, ref } from 'vue'
import { getNotes } from '../services/notes/notes'

const notes = ref([])

const updateNotes = async () => {
    notes.value = await getNotes()
}

onMounted(async () => {
    await updateNotes()
})

</script>