<template>
    <div id="today" class="
        w-full
        overflow-y-auto
    ">
        <div class="welcome mt-8 lg:mt-0">
            <h2 class="text-center font-bold">Bonjour, {{ user.username }}</h2>
            <h3 class="px-8 mt-6">Voici votre planning pour aujourd'hui :</h3>
        </div>

        <div v-if="notes.length > 0" class="planning mt-8 px-4">
            <div class="morning">
                <h3>Ce matin :</h3>
                <ul class="mt-4">
                    <li v-for="note in morningNotes" :key="note.id"
                        :class="note.state === 'archived' ? 'line-through text-gray-600' : ''">
                        <div>
                            <a href="" @click.prevent="goToNote(note.id)">{{ note.title }}</a>
                            <ul v-if="note.tags.length > 0" class="mt-2">
                                <li v-for="tag in note.tags" :key="tag.id" class="inline-block mr-2">
                                    <span class="px-2 py-1 rounded-full bg-gray-200 text-gray-700">{{ tag.name }}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <p v-if="morningNotes.length === 0" class="text-gray-600">Rien de prévu pour le moment</p>
                </ul>
            </div>

            <div class="afternoon mt-8">
                <h3>Ce après-midi :</h3>
                <ul class="mt-4">
                    <li v-for="note in afternoonNotes" :key="note.id"
                        :class="note.state === 'archived' ? 'line-through text-gray-600' : ''">
                        <a href="" @click.prevent="goToNote(note.id)">{{ note.title }}</a>
                    </li>
                    <p v-if="afternoonNotes.length === 0" class="text-gray-600">Rien de prévu pour le moment</p>
                </ul>
            </div>
        </div>

        <div v-else class="planning mt-8 px-4">
            <p class="mx-16 text-center">Vous n'avez rien de prévu aujourd'hui !</p>
        </div>

        <div class="end_message mt-12">
            <h3 class="text-center">Bon vendredi !</h3>
        </div>

        <blockquote class="text-center my-12">
            <p>“L'intelligence, c'est la capacité de s'adapter au changement.”</p>
            <cite>Stephen Hawking</cite>
        </blockquote>
    </div>
</template>
  
<script>
import { getTodayNotes } from '../services/notes/notes';
import { getCurrentUser } from '../services/users/users';
export default {
    name: 'TodayView',

    data() {
        return {
            user: {},
            notes: [{}],
        };
    },

    async mounted() {
        this.getTodayNotes();
        this.getCurrentUser();
    },

    computed: {
        morningNotes() {
            return this.notes.filter((note) => {
                const deadline = new Date(note.deadlineAt);
                const deadlineHour = deadline.getHours();
                return deadlineHour < 12;
            });
        },

        afternoonNotes() {
            return this.notes.filter((note) => {
                const deadline = new Date(note.deadlineAt);
                const deadlineHour = deadline.getHours();
                return deadlineHour >= 12;
            });
        },
    },

    methods: {
        async getCurrentUser() {
            try {
                const user = localStorage.getItem('user');
                this.user = JSON.parse(user);
            } catch (error) {
                console.error(error);
            }

            this.user = await getCurrentUser();
        },

        async getTodayNotes() {
            try {
                const notes = localStorage.getItem('todayNotes');
                this.notes = JSON.parse(notes);
            } catch (error) {
                console.error(error);
            }
            this.notes = await getTodayNotes();
        },

        goToNote(noteId) {
            this.$router.push(`/notes/${noteId}`);
        },
    },
};
</script>
  
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

#today {
    height: calc(100vh - #{$headerHeight} - #{$footerHeight});
}

h2 {
    font-size: 2em;
}

h3 {
    font-size: 1.5rem;
}

p {
    font-size: 1.25rem;
    font-family: 'Architects Daughter', cursive;
}

ul {
    list-style-type: upper-roman;
    padding-left: 1rem;

    li {
        margin-left: 1rem;
        font-size: 1.25rem;
        font-family: 'Architects Daughter', cursive;
    }
}
</style>  