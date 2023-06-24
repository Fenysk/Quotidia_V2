<template>
    <div class="px-4 py-8">
        <h2 class="font-semibold ">Trier par :</h2>
        <div>
            <div class="mt-1 flex flex-row items-center gap-2">
                <input type="radio" v-model="selectedSort" value="recent">
                <label>Récentes</label>
            </div>
            <div class="mt-1 flex flex-row items-center gap-2">
                <input type="radio" v-model="selectedSort" value="old">
                <label>Anciennes</label>
            </div>
        </div>

        <h2 class="font-semibold mt-8">Contient :</h2>
        <div>
            <div class="mt-1 flex flex-row items-center gap-2">
                <input type="checkbox" v-model="containOptions" value="importance">
                <label>Importance</label>
            </div>
            <div class="mt-1 flex flex-row items-center gap-2">
                <input type="checkbox" v-model="containOptions" value="date">
                <label>Date</label>
            </div>
            <div class="mt-1 flex flex-row items-center gap-2">
                <input type="checkbox" v-model="containOptions" value="tasks">
                <label>Tâches</label>
            </div>
            <div class="mt-1 flex flex-row items-center gap-2">
                <input type="checkbox" v-model="containOptions" value="location">
                <label>Localisation</label>
            </div>
        </div>

        <h2 v-if="user.tags"
        class="font-semibold mt-8">Tags :</h2>
        <div v-for="tag in user.tags" :key="tag.id">
            <div class="mt-1 flex flex-row items-center gap-2">
                <input type="checkbox" v-model="selectedTags" :value="tag.label">
                <label>{{ tag.label }}</label>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getCurrentUser } from '../../services/users/users';

export default {
    name: 'NotesSidebar',
    data() {
        return {
            selectedSort: 'recent',
            containOptions: [],
            selectedTags: [],

            user: {},
        };
    },

    async mounted() {
        await this.updateUser()
    },

    methods: {
        async updateUser() {
            this.user = await getCurrentUser()
        },
    },

    watch: {
        selectedSort() {
            this.$emit('sort', this.selectedSort);
        },
        containOptions() {
            this.$emit('contain', this.containOptions);
        },
        selectedTags() {
            this.$emit('tags', this.selectedTags);
        },
    },
}
</script>
  