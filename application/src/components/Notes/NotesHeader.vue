<template>
    <div class="w-3/4 h-full flex">
        <input type="text" v-model="searchQuery" @input="searchNotes" class="
        h-full w-full
        bg-transparent font-normal text-lg
        text-white placeholder-gray-200
        border-l-2 border-yellow-800
        px-4 py-2
        focus:outline-none
      " placeholder="Search notes..." />
    </div>
</template>
  
<script>
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
        }
    }
};
</script>
