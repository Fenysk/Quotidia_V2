<template>
    <div class="controls flex justify-end gap-2 p-2">
        <button @click="archiveNote" class="flex gap-2 items-center
            bg-yellow-700 hover:bg-yellow-800
            text-white font-bold py-2 px-4 rounded-lg
            text-sm
            ">
            <span>Archiver</span>
            <i class="fas fa-archive"></i>
        </button>
        <pre>{{ note }}</pre>
        <button @click="deleteNote" class="flex gap-2 items-center
            bg-yellow-700 hover:bg-red-800
            text-white font-bold py-2 px-4 rounded-lg
            text-sm
            ">
            <span>Delete</span>
            <i class="fas fa-trash"></i>
        </button>
    </div>
</template>
  
<script>
import { setStateNote } from '../../services/notes/notes'

export default {
    name: "NoteHeader",
    
    props: {
        note: Object
    },

    methods: {
        async archiveNote() {
            await setStateNote(this.note.id, 'archived')
            this.$router.push('/notes')
        },
        async deleteNote() {
            await setStateNote(this.note.id, 'deleted')
            this.$router.push('/notes')
        }
    }
};
</script>
