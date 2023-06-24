<template>
    <div id="notes" class="
    bg-yellow-200 h-full
    w-full
    ">
        <input class="text-center font-bold mt-2 py-2 w-full bg-transparent" v-model="note.title" placeholder="Note title" />

        <div class="controls flex justify-center gap-8 p-2">
            <button
            @click="archiveNote"
            class="flex gap-2 items-center
            bg-yellow-700 hover:bg-yellow-800
            text-white font-bold py-2 px-4 rounded-lg
            ">
                <span>Archiver</span>
                <i class="fas fa-archive"></i>
            </button>
            <button
            @click="deleteNote"
            class="flex gap-2 items-center
            bg-yellow-700 hover:bg-red-800
            text-white font-bold py-2 px-4 rounded-lg
            ">
                <span>Delete</span>
                <i class="fas fa-trash"></i>
            </button>
        </div>

        <textarea v-show="!isMarkdown"
        @focusout="switchToMarkdown" class="w-full mt-4 p-2 bg-transparent" v-model="note.text"
            placeholder="Note text"></textarea>

        <div @click="switchToMarkdown" v-show="isMarkdown" class="w-full mt-4 p-2 bg-transparent"
            v-html="markdownToHtml(note.text)"></div>
    </div>
</template>
  
<script>
import { getNoteById, setStateNote } from '../services/notes/notes'
// import marked from 'marked';

export default {
    name: 'NoteView',

    data() {
        return {
            note: {},
            isMarkdown: false
        }
    },

    mounted() {
        this.updateNote()
    },

    methods: {
        async updateNote() {
            const id = this.$route.params.id
            this.note = await getNoteById(id)
        },
        markdownToHtml(text) {
            return text
        },
        switchToMarkdown() {
            this.isMarkdown = !this.isMarkdown;
        },

        async deleteNote() {
            await setStateNote(this.note.id, 'deleted')
            this.$router.push('/notes')
        },

        async archiveNote() {
            await setStateNote(this.note.id, 'archived')
            this.$router.push('/notes')
        }

    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/scss/variables';

input {
    font-size: 1.5rem;
    font-family: 'Architects Daughter', cursive;
}

textarea {
    min-width: 100%;
    resize: none;
}
</style>
  