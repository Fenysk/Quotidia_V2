<template>
    <div class="px-4 py-8 overflow-auto">
        <pre>{{ note }}</pre>

        <div class="dates
            mb-4
        ">
            <p>Créé le {{ note.createdToDisplay }}</p>
            <p>Mis à jour le {{ note.updatedToDisplay }}</p>
        </div>

        <div class="tags
            mb-4
        " v-if="note.tags">
            <ul class="flex">
                <li v-for="tag in note.tags" :key="tag.id" class="flex items-center gap-2 p-2">
                    <span @click="console.log(tag.id)" class="text-yellow-900 font-bold text-lg">#{{ tag.label }}</span>
                </li>
                <!-- TODO: Add tags -->
            </ul>
        </div>

        <div class="deadline
            mb-4
        " v-if="note.deadlineAt">
            <h3 class="font-bold text-lg">Deadline</h3>
            <p>
                <span>{{ note.deadlineToDisplay }}</span>
            </p>
        </div>

        <div class="duration
            mb-4
        " v-if="note.duration">
            <h3 class="font-bold text-lg">Durée</h3>
            <p>
                <span>{{ note.duration }} minutes</span>
            </p>
        </div>

        <div class="tasks
            mb-4
        " v-if="note.tasks && note.tasks.length > 0">

            <h3 class="font-bold text-lg">Tasks</h3>

            <ul class="flex flex-col gap-2">
                <li v-for="task in note.tasks" :key="task.id" class="flex items-center gap-2 p-2">
                    <span>{{ task.label }}</span>
                </li>
            </ul>

        </div>

    </div>
</template>
  
<script>
import { getCurrentUser } from '../../services/users/users';

export default {
    name: 'NoteSidebar',

    data() {
        return {
            user: {},
            note: {},
        };
    },

    async mounted() {
        await this.updateUser()
        await this.updateNote()
    },

    methods: {
        async updateUser() {
            this.user = await getCurrentUser()
        },

        async updateNote() {
            const id = parseInt(this.$route.params.id);
            const notes = JSON.parse(localStorage.getItem('notes'));
            this.note = notes.find(note => note.id === id);
            this.note.deadlineToDisplay = this.note.deadlineAt ? new Date(this.note.deadlineAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : null;

            this.note.createdToDisplay = this.note.createdAt ? new Date(this.note.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : null;
            this.note.updatedToDisplay = this.note.updatedAt ? new Date(this.note.updatedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : null;

            // minute to hours
            this.note.durationToDisplay = this.note.duration ? `${Math.floor(this.note.duration / 60)}h${this.note.duration % 60}` : null;
        },
    },
}
</script>
  