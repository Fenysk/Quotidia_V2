<template>
    <div class="w-full h-full">
        <div class="w-full h-full overflow-auto pb-8">
            <table class="w-full h-full table-fixed">
                <thead class="bg-green-700 text-white">
                    <tr>
                        <th class="py-4 px-4 border-b border-gray-300">Lun</th>
                        <th class="py-4 px-4 border-b border-gray-300">Mar</th>
                        <th class="py-4 px-4 border-b border-gray-300">Mer</th>
                        <th class="py-4 px-4 border-b border-gray-300">Jeu</th>
                        <th class="py-4 px-4 border-b border-gray-300">Ven</th>
                        <th class="py-4 px-4 border-b border-gray-300">Sam</th>
                        <th class="py-4 px-4 border-b border-gray-300">Dim</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="week in calendarMonth" :key="week">
                        <td v-for="day in week" :key="day" class="border-b border-gray-300">
                            <div class="w-full h-full">
                                <p class="py-4 px-4 text-green-900"
                                    :class="(new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth()) ? 'text-red-600 text-2xl font-bold' : 'text-xl font-semibold'">
                                    {{ day }} </p>
                                <ul class="pr-1">
                                    <li v-for="note in notes" :key="note.title" class="mt-2">
                                        <div @click="goToNote(note)" v-if="new Date(note.deadlineAt).getDate() === day"
                                            class="bg-yellow-200 overflow-hidden rounded cursor-pointer p-1">
                                            {{ note.title
                                                .substring(0, 30)
                                                .concat('...') }}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div class="notes mt-8">
            <h2 class="text-2xl font-bold">Notes</h2>
            <ul>
                <li v-for="note in notes" :key="note.title">
                    <div class="bg-yellow-200 p-2 rounded">
                        {{ note.title }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import { getNotesWithDeadline } from '../services/notes/notes';

export default {
    name: "CalendarView",

    data() {
        return {
            calendarMonth: [],
        };
    },

    props: {
        currentDate: Date,
        notes: Array,
    },

    watch: {
        currentDate() {
            this.calendarMonth = this.generateMonth(this.currentDate);
            this.updateNotes();
        },
    },

    async mounted() {
        this.calendarMonth = this.generateMonth(this.currentDate);
        await this.updateNotes();
    },

    methods: {
        async updateNotes() {
            this.$emit('updateNotes', await getNotesWithDeadline(this.currentDate));
        },

        generateMonth(date) {
            let month = [];
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            let totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

            for (let week = 0, day = 1; day <= totalDays; week++) {
                month[week] = [];

                for (let weekDay = 0; weekDay < 7; weekDay++) {
                    if ((week === 0 && weekDay < firstDay - 1) || day > totalDays) {
                        month[week].push('');
                    } else {
                        month[week].push(day++);
                    }
                }
            }

            return month;
        },

        goToNote: function (note) {
            this.$router.push('/notes/' + note.id);
        },
    },
};
</script>
  
<style lang="scss" scoped>
.controls {
    button {
        padding: 8px 16px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
        cursor: pointer;
    }
}
</style>
  