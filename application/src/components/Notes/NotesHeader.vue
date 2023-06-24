<template>
    <input type="text" v-model="searchQuery" @input="searchNotes" class="
        h-full w-3/4
        bg-transparent font-normal text-lg
        text-white placeholder-gray-200
        border-l-2 border-yellow-800
        px-4 py-2
      " placeholder="Search notes..." />
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
