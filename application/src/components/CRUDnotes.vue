<template>
    <div class="
    CRUDnotes
    border-solid border-2 border-gray-400
    p-4 m-4
    ">
        <h1 class="text-2xl font-bold">CRUDnotes</h1>
        <p>CRUDnotes is a component.</p>

        <form class="flex flex-col">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Content" />
            <button type="submit">Add Note</button>
        </form>

        <ul>
            <li class="border-2 border-solid my-2" v-for="note in notes" :key="note.id">
                <p>Id : {{ note.id }}</p>
                <p>UserId : {{ note.userId }}</p>
                <p>Created at : {{ note.createdAt }}</p>
                <p>Updated at : {{ note.updatedAt }}</p>
                <p>Titre : {{ note.title }}</p>
                <p>Contenu : {{ note.text }}</p>
                <button @click="deleteNote(note.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getNotes } from '../services/notes/notes.js'

const notes = ref([])

const addNote = () => {

}

const deleteNote = () => {
    
}

const updateNote = () => {

}


onMounted(async () => {
    // set notes with getNotes()
    notes.value = await getNotes()
})


</script>