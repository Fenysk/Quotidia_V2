<template>
    <div id="dashboard" class="
            w-screen
            bg-gray-300
    ">

        <h1>Dashboard</h1>

        <h2>Voici le planning du jour</h2>

        <h3>Matin</h3>
        <ul>
            <li>Tâche 1</li>
            <li>Tâche 2</li>
        </ul>

        <h3>Après-midi</h3>
        <ul>
            <li>Tâche 1</li>
            <li>Tâche 2</li>
        </ul>

        <p>Bon vendredi !</p>

        <blockquote>
            <p>“L'intelligence, c'est la capacité de s'adapter au changement.”</p>
            <cite>Stephen Hawking</cite>
        </blockquote>

        <pre class="mt-16">
            {{ notes }}
        </pre>

    </div>
</template>



<script>
import { getTodayNotes } from '../services/notes/notes';

export default {
    name: 'DashboardView',

    data() {
        return {
            notes: []
        }
    },

    async mounted() {
        await this.getTodayNotes()
    },

    methods: {
        async getTodayNotes() {
            this.notes = await getTodayNotes()
        }
    }
}

tailwind.config = {
    corePlugins: {
        preflight: true
    }
}
</script>



<style lang="scss" scoped></style>