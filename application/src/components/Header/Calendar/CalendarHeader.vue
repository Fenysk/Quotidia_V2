<template>
    <div class="controls flex justify-end gap-2 p-2
    border-l-2 border-green-800
    flex items-center justify-between
    ">
        <button @click="prevMonth" class="flex gap-2 items-center
            bg-green-700 hover:bg-green-800
            text-white font-bold py-2 px-4 rounded-lg
            text-sm
            ">
            <i class="fas fa-chevron-left"></i>
            <span>Précédent</span>
        </button>
        <p class="text-white font-bold text-xl">{{ currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) }}</p>
        <button @click="nextMonth" class="flex gap-2 items-center
            bg-green-700 hover:bg-green-800
            text-white font-bold py-2 px-4 rounded-lg
            text-sm
            ">
            <span>Suivant</span>
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
</template>
  
<script>

export default {
    name: "CalendarHeader",

    props: {
        currentDate: Date,
    },

    methods: {
        nextMonth() {
            this.$emit('nextMonth');
        },

        prevMonth() {
            this.$emit('prevMonth');
        },
    },
};
</script>
