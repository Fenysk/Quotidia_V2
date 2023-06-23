<template>
    <div id="notes">
        <h2>{{ note.title }}</h2>

        <textarea class="resize" v-model="note.text" placeholder="Note text"></textarea>

        <div v-if="note.text">
            {{ note.text }}
        </div>

        <pre class="overflow-auto">{{ note }}</pre>
    </div>
</template>

<script>
import { getNoteById } from '../services/notes/notes'

export default {
    name: 'NoteView',

    data() {
        return {
            note: {}
        }
    },

    mounted() {
        this.updateNote()
    },

    methods: {
        async updateNote() {
            const id = this.$route.params.id
            this.note = await getNoteById(id)
        }
    }
}
</script>

<style>
textarea {
    width: 80%;
    height: 200px;
    border: 1px solid #ccc;
}
</style>