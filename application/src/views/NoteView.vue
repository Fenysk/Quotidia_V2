<template>
    <div id="notes" class="
    bg-yellow-200 h-full
    w-full
    ">
        <ul class="flex">
            <li v-for="tag in note.tags" :key="tag.id" class="flex items-center gap-2 p-2">
                <span @click="editTag(tag.id)" class="text-yellow-900 font-bold text-lg">#{{ tag.label }}</span>
            </li>
            <!-- TODO: Add tags -->
        </ul>

        <input @keyup="saveNote"
            class="text-center font-bold mt-2 py-2 w-full bg-transparent focus:outline-none focus:border-transparent"
            v-model="note.title" placeholder="Note title" />

        <textarea ref="noteTextarea" v-show="!isMarkdown" @keyup="saveNote" @focusout="switchToMarkdown" class="w-full h-full px-4 mt-4 p-2 bg-transparent pre-wrap
            focus:outline-none focus:border-transparent
            " v-model="note.text" placeholder="Note text"></textarea>


        <div @click="switchToMarkdown" v-show="isMarkdown" class="markdown w-full px-4 mt-4 p-2 bg-transparent"
            v-html="markdownToHtml(note.text)"></div>

    </div>
</template>
  
<script>
import { getNoteById, updateNote, setStateNote } from '../services/notes/notes'
import { markdownToHtml } from '../utils/markdown.js'

export default {
    name: 'NoteView',

    data() {
        return {
            note: {},
            isMarkdown: false,
            updateTimeout: null  // Ajoutez cette ligne
        }
    },

    mounted() {
        this.updateNote()
    },

    methods: {
        async updateNote() {
            const id = parseInt(this.$route.params.id)

            try {
                
                let notes = localStorage.getItem('notes')
                notes = JSON.parse(notes)
                const note = notes.find(note => note.id === id)
                this.note = note

            } catch (error) {
                console.error(error)
            }

            this.note = await getNoteById(id)
        },

        markdownToHtml(text) {
            return markdownToHtml(text)
        },
        
        switchToMarkdown() {
            this.isMarkdown = !this.isMarkdown;
            this.$nextTick(() => {
                if (!this.isMarkdown) {
                    this.$refs.noteTextarea.focus();
                }
            });
        },


        async editTag(tagId) {
            // TODO: Edit tag
        },



        async deleteNote() {
            await setStateNote(this.note.id, 'deleted')
            this.$router.push('/notes')
        },

        async archiveNote() {
            await setStateNote(this.note.id, 'archived')
            this.$router.push('/notes')
        },
        async saveNote() {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);  // Annuler le délai précédent
            }
            this.updateTimeout = setTimeout(async () => {
                await updateNote(this.note);
            }, 400);  // Définir un nouveau délai de 100ms
        },


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

<style lang="scss" scoped>
.markdown {

    h1 {
        font-size: 2rem;
        font-family: 'Architects Daughter', cursive;
    }

    h2 {
        font-size: 1.8rem;
        font-family: 'Architects Daughter', cursive;
    }

    h3 {
        font-size: 1.6rem;
        font-family: 'Architects Daughter', cursive;
    }

    h4 {
        font-size: 1.4rem;
        font-family: 'Architects Daughter', cursive;
    }

    h5 {
        font-size: 1.2rem;
        font-family: 'Architects Daughter', cursive;
    }

    h6 {
        font-size: 1rem;
        font-family: 'Architects Daughter', cursive;
    }

    p {
        font-size: 1.2rem;
        font-family: 'Architects Daughter', cursive;
    }

    li {
        font-size: 1.3rem;
        font-family: 'Architects Daughter', cursive;
    }
}
</style>
  