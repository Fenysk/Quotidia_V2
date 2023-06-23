<template>
    <div id="dashboard" class="
            w-screen
    ">

        <div class="welcome
            mt-16
            px-4
        ">
            <h2 class="text-center">Voici le planning du jour</h2>
        </div>

        <div class="planning
            mt-12
            px-4
        ">
            <h3>Matin</h3>
            <ul class="mt-4">
                <li>Tâche 1</li>
                <li>Tâche 2</li>
            </ul>

            <h3 class="mt-8">Après-midi</h3>
            <ul class="mt-4">
                <li>Tâche 1</li>
                <li>Tâche 2</li>
            </ul>
        </div>

        <div class="end_message
            mt-16
        ">
            <h3 class="text-center">Bon vendredi !</h3>
        </div>

        <blockquote>
            <p>“L'intelligence, c'est la capacité de s'adapter au changement.”</p>
            <cite>Stephen Hawking</cite>
        </blockquote>

        <pre class="mt-16 overflow-auto">
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



<style lang="scss" scoped>

h2 {
    font-size: 2em;
    font-family: 'Architects Daughter', cursive;
}

h3 {
    font-size: 1.5rem;
    font-family: 'Architects Daughter', cursive;
}

p {
    font-size: 1.25rem;
    font-family: 'Architects Daughter', cursive;
}

blockquote, cite {
    font-family: 'Architects Daughter', cursive;
}

ul {
    list-style-type: square;
    padding-left: 1rem;

    li {
        margin-left: 1rem;
        font-size: 1.25rem;

        font-family: 'Architects Daughter', cursive;
    }
}
</style>