<template>
    <div id="notes" class="
    w-full h-full
    ">
        <ul class="p-2 flex flex-wrap gap-4 justify-center overflow-y-auto">
            <li v-for="note in notes" :key="note.id">
                <NoteMiniature :note="note" />
            </li>
        </ul>
    </div>
</template>
  
<script>
import { getNotes } from '../services/notes/notes'
import NoteMiniature from '../components/Notes/NoteMiniature.vue'
import { filteredNotes } from '../utils/filter'

export default {
    name: 'NotesView',

    components: {
        NoteMiniature
    },

    props: {
        searchQuery: String,
        sortQuery: String,
        containQuery: Array,
        tagsQuery: Array
    },

    data() {
        return {
            notes: [],
        }
    },

    watch: {
        async searchQuery() {
            await this.searchNotes()
        },
        async sortQuery() {
            await this.searchNotes()
        },
        async containQuery() {
            await this.searchNotes()
        },
        async tagsQuery() {
            await this.searchNotes()
        },
    },


    async mounted() {
        await this.updateNotes()
    },

    methods: {
        async updateNotes() {

            try {
                const notes = localStorage.getItem('notes')
                this.notes = JSON.parse(notes)

            } catch (error) {
                console.error(error)
            }

            this.notes = await getNotes()
        },

        searchNotes() {
            const notes = JSON.parse(localStorage.getItem('notes'))

            this.notes = filteredNotes(
                notes,
                this.searchQuery,
                this.sortQuery,
                this.containQuery,
                this.tagsQuery
            )
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

ul {
    max-height: 100%;
}

#notes.mobile {
    height: calc(100vh - #{$headerHeight} - #{$footerHeight});
}
</style>