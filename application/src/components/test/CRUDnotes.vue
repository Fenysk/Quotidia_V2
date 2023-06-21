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
                <h3>Titre : {{ note.title }}</h3>
                <h4>Texte : {{ note.text }}</h4>
                <ul>
                    <h5>Tâches</h5>
                    <ol v-for="task in note.tasks.filter(task => task.state === null)" :key="task.id">
                        <p :class="task.completedAt ? 'line-through' : ''">Id : {{ task.id }}</p>
                        <p>Tâche : {{ task.task }}</p>
                        <button v-if="!task.completedAt" @click="taskDone(task.id)">Terminer</button>
                        <button @click="archiveTask(task.id)">Archiver</button>
                        <button @click="deleteTask(task.id)">Supprimer</button>
                    </ol>
                </ul>
                <p v-if="note.deadlineAt">Deadline : {{ formatDate(new Date(note.deadlineAt)) }}</p>
                <p v-if="note.reminderDelay">Rappel : {{ note.reminderDelay }} minutes avant.</p>
                <p v-if="note.location">Lieu : {{ note.location }}</p>
                <ul>
                    <h5>Tags</h5>
                    <li v-for="tag in note.tags" :key="tag.id">
                        <p>{{ tag.label }}</p>
                    </li>
                </ul>
                <button @click="archiveNote(note.id)">Archiver</button>
                <button @click="deleteNote(note.id)">Supprimer</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getNotes, setStateNote } from '../../services/notes/notes'
import { setStateTask, checkTask } from '../../services/tasks/tasks'

const notes = ref([])

const updateNotes = async () => {
    notes.value = await getNotes()
}

const addNote = () => {

}

const updateNote = (noteId) => {

}

const taskDone = async (taskId) => {

    notes.value = notes.value.map(note => { // On met à jour la note en local
        note.tasks = note.tasks.map(task => {
            if (task.id === taskId) {
                task.completedAt = new Date()
            }
            return task
        })
        return note
    })

    await checkTask(taskId) // On met à jour la note en BDD
    await updateNotes()
}

const archiveNote = async (noteId) => {
    notes.value = notes.value.map(note => { // On met à jour la note en local
        if (note.id === noteId) {
            note.state = 'archived'
        }
        return note
    })

    await setStateNote(noteId, 'archived') // On met à jour la note en BDD
    await updateNotes()
}

const deleteNote = async (noteId) => {
    notes.value = notes.value.map(note => { // On met à jour la note en local
        if (note.id === noteId) {
            note.state = 'deleted'
        }
        return note
    })

    await setStateNote(noteId, 'deleted') // On met à jour la note en BDD
    await updateNotes()
}

const archiveTask = async (taskId) => {
    notes.value = notes.value.map(note => { // On met à jour la tâche en local
        note.tasks = note.tasks.map(task => {
            if (task.id === taskId) {
                task.state = 'archived'
            }
            return task
        })
        return note
    })

    await setStateTask(taskId, 'archived') // On met à jour la tâche en BDD
    await updateNotes()
}

const deleteTask = async (taskId) => {
    notes.value = notes.value.map(note => { // On met à jour la tâche en local
        note.tasks = note.tasks.map(task => {
            if (task.id === taskId) {
                task.state = 'deleted'
            }
            return task
        })
        return note
    })

    await setStateTask(taskId, 'deleted') // On met à jour la tâche en BDD
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