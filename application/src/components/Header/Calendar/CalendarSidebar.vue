<template>
    <div class="px-4 py-8 overflow-auto">
        <ul class="flex flex-col gap-2 items-center justify-center">
            <li v-for="note in notes">
                <NoteMiniature :note="note" />
            </li>
            <li v-if="notes.length === 0">
                <p class="text-green-900 text-xl">Aucun évènements</p>
            </li>
        </ul>
    </div>
</template>

<script>
import NoteMiniature from "../../Notes/NoteMiniature.vue"

export default {
    name: "CalendarSidebar",

    components: { NoteMiniature },

    props: {
        notes: Array,
    },
};
</script>