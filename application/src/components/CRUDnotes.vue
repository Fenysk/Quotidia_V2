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
                <button @click="archiveNote(note.id)">Archiver</button>
                <button @click="deleteNote(note.id)">Supprimer</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getNotes, setStateNote } from '../services/notes/notes'

const notes = ref([])

const addNote = () => {

}

const updateNote = (noteId) => {
    console.log(noteId)
}

const deleteNote = async (noteId) => {
    await setStateNote(noteId, 'deleted')
    notes.value = await getNotes()
}

const archiveNote = async (noteId) => {
    await setStateNote(noteId, 'archived')
    notes.value = await getNotes()
}


onMounted(async () => {
    // set notes with getNotes()
    notes.value = await getNotes()
})


</script>