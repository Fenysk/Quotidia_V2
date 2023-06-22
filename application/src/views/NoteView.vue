<template>
    <div id="notes">
        <h2>{{ note.title }}</h2>

        <textarea class="resize" v-model="note.text" placeholder="Note text"></textarea>
        
        <div v-if="note.text">
            {{ note.text }}
        </div>

        {{ note }}
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getNoteById } from '../services/notes/notes'

const note = ref({})

const updateNote = async () => {
    const id = useRoute().params.id
    note.value = await getNoteById(id)
}

onMounted(async () => {
    await updateNote()
})

</script>