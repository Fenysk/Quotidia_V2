<template>
    <div id="notes" class="h-full w-full">
        <ul class="p-2 flex flex-wrap gap-4 justify-center h-full overflow-y-auto">
            <li v-for="note in notes" :key="note.id">
                <NoteMiniature :note="note" />
            </li>
        </ul>
    </div>
</template>
  
<script>
import { getNotes, searchNotes } from '../services/notes/notes'
import NoteMiniature from '../components/Notes/NoteMiniature.vue'

export default {
    name: 'NotesView',

    components: {
        NoteMiniature
    },

    props: {
        searchQuery: String
    },

    data() {
        return {
            notes: [],
        }
    },

    watch: {
        async searchQuery() {
            await this.searchNotes()
        }
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

        async searchNotes() {
            this.notes = await searchNotes(this.searchQuery)            
        },
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#notes.mobile {
    height: calc(100vh - #{$headerHeight} - #{$footerHeight});
}
</style>