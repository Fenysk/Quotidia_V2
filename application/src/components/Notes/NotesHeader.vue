<template>
    <div class="h-full flex">
        <input type="text" v-model="searchQuery" @input="searchNotes" class="
          h-full w-full
          bg-transparent font-normal text-lg
          text-white placeholder-gray-200
          px-4 py-2
          border-l-2 border-yellow-800
          focus:outline-none
        " placeholder="Search notes..." />

        <div class="controls flex justify-end gap-2 p-2 border-l-2 border-yellow-800">
            <button @click="createNote" class="
            flex gap-2 items-center
            bg-yellow-700 hover:bg-yellow-800
            text-white font-bold py-2 px-4 rounded-lg
            text-sm
          ">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    </div>
</template>
  
<script>
import { createNote } from '../../services/notes/notes'

export default {
    name: "NotesHeader",
    data() {
        return {
            searchQuery: ""
        };
    },
    methods: {
        searchNotes() {
            this.$emit('search', this.searchQuery);
        },

        async createNote() {
            const note = await createNote()
            this.$router.push(`/notes/${note.id}`)
        }
    }
};
</script>
  