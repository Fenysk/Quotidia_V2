<template>
    <div id="notes" class="overflow-y-scroll">
        <ul class="
        p-2 mt-4
        flex flex-wrap gap-4
        items-center justify-center
        ">
            <li v-for="note in notes" :key="note.id">
                <NoteMiniature :note="note" />
            </li>
        </ul>
    </div>
</template>

<script>
import { getNotes } from '../services/notes/notes'

import NoteMiniature from '../components/Notes/NoteMiniature.vue'

export default {
    name: 'NotesView',

    components: {
        NoteMiniature
    },

    data() {
        return {
            notes: []
        }
    },

    async mounted() {
        await this.updateNotes()
    },

    methods: {
        async updateNotes() {
            this.notes = await getNotes()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#notes {
    height: calc(100vh - #{$headerHeight} - #{$footerHeight});
}
</style>