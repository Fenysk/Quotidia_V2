<template>
    <div class="
    CRUDnotes
    border-solid border-2 border-gray-400
    p-4 m-4
    ">
        <h1>Notes</h1>

        <ul>
            <li class="border-2 border-solid my-2" v-for="note in notes" :key="note.id">
                <p>Id : {{ note.id }}</p>
                <p>UserId : {{ note.userId }}</p>
                <p>Created at : {{ formatDate(new Date(note.createdAt)) }}</p>
                <p>Updated at : {{ formatDate(new Date(note.updatedAt)) }}</p>
                <p>Titre : {{ note.title }}</p>
                <p>Contenu : {{ note.text }}</p>
                <p v-if="note.deadlineAt">Deadline : {{ formatDate(new Date(note.deadlineAt)) }}</p>
                <p v-if="note.reminderDelay">Rappel : {{ note.reminderDelay }} minutes avant.</p>
                <button @click="archiveNote(note.id)">Archiver</button>
                <button @click="deleteNote(note.id)">Supprimer</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getNotes, setStateNote } from '../../services/notes/notes'

const notes = ref([])

const updateNotes = async () => {
    notes.value = await getNotes()
}

const addNote = () => {

}

const updateNote = (noteId) => {
    console.log(noteId)
}

const deleteNote = async (noteId) => {
    await setStateNote(noteId, 'deleted')
    await updateNotes()
}

const archiveNote = async (noteId) => {
    await setStateNote(noteId, 'archived')
    await updateNotes()
}


const formatDate = (date) => {
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}


onMounted(async () => {
    await updateNotes()
})


</script>