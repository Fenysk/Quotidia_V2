<template>
    <div :class="[
        path.name === 'account' ? 'bg-blue-100' : '',
        path.name === 'today' ? 'bg-transparent' : '',
        path.name === 'notes' ? 'bg-yellow-100' : '',
        path.name === 'note' ? 'bg-yellow-200' : '',
        path.name === 'calendar' ? 'bg-green-100' : '',
        path.name === 'journal' ? 'bg-red-100' : '',
    ]" class="middle_bar
        h-full
        overflow-hidden
        rounded-t-lg
        transition-all duration-500
    ">

        <header :class="[
            path.name === 'account' ? 'h-16 bg-blue-700 opacity-100' : '',
            path.name === 'today' ? 'h-0 overflow-hidden opacity-0' : '',
            path.name === 'notes' ? 'h-16 bg-yellow-700 opacity-100' : '',
            path.name === 'note' ? 'h-16 bg-yellow-700 opacity-100' : '',
            path.name === 'calendar' ? 'h-16 bg-green-700 opacity-100' : '',
            path.name === 'journal' ? 'h-16 bg-red-700 opacity-100' : '',
        ]" class="
            flex flex-row justify-between items-center
            transition-all duration-500
        ">

            <div class="header_name
                h-16 w-1/4
                flex flex-row items-center
                px-4
            ">
                <h2 class="
                    font-semibold text-xl text-white
                ">{{ path.meta.title }}</h2>
            </div>

            <NotesHeader class="h-16 w-3/4" v-if="path.name === 'notes'" @search="updateSearchQuery" @sort="updateSortQuery"
                @contain="updateContainQuery" @tags="updateTagsQuery" />
            <NoteHeader class="h-16 w-3/4" v-if="path.name === 'note'" />
            <CalendarHeader class="h-16 w-3/4" v-if="path.name === 'calendar'" @prevMonth="prevMonth" @nextMonth="nextMonth"
                :currentDate="currentDate" />

        </header>

        <div class="
            flex flex-row h-[calc(100%-4rem)]
        ">
            <NotesSidebar class="h-full w-1/4" v-if="path.name === 'notes'" @sort="updateSortQuery"
                @contain="updateContainQuery" @tags="updateTagsQuery" />
            <NoteSidebar class="h-full w-1/4" v-if="path.name === 'note'" />
            <CalendarSidebar class="h-full w-1/4" v-if="path.name === 'calendar'" :notes="notes" />

            <router-view :class="[
                path.name === 'today' ? 'w-full' : '',
                path.name === 'account' ? 'w-full' : '',
                path.name === 'notes' ? 'w-3/4' : '',
                path.name === 'note' ? 'w-3/4' : '',
                path.name === 'calendar' ? 'w-3/4' : '',
            ]" v-slot="{ Component }">
                <Transition name="page-opacity" mode="out-in">
                    <component :is="Component" :searchQuery="searchQuery" :sortQuery="selectedSortQuery"
                        :containQuery="containOptionsQuery" :tagsQuery="selectedTagsQuery" :currentDate="currentDate"
                        :notes="notes" @updateNotes="updateNotes" />
                </Transition>
            </router-view>
        </div>

    </div>
</template>

  
<script>
import NotesHeader from '../Notes/NotesHeader.vue';
import NoteHeader from '../Notes/NoteHeader.vue';
import NotesSidebar from '../Notes/NotesSidebar.vue';
import NoteSidebar from '../Notes/NoteSidebar.vue';
import CalendarHeader from '../Header/Calendar/CalendarHeader.vue';
import CalendarSidebar from '../Header/Calendar/CalendarSidebar.vue';


export default {
    name: "MiddleBar",
    components: { NotesHeader, NoteHeader, NotesSidebar, NoteSidebar, CalendarHeader, CalendarSidebar },

    props: {
        path: String,
    },
    data() {
        return {
            searchQuery: "",
            selectedSortQuery: "recent",
            containOptionsQuery: [],
            selectedTagsQuery: [],

            currentDate: new Date(),
            notes: [],
        };
    },
    methods: {
        updateSearchQuery(query) {
            this.searchQuery = query;
        },

        updateSortQuery(query) {
            this.selectedSortQuery = query;
        },

        updateContainQuery(query) {
            this.containOptionsQuery = query;
        },

        updateTagsQuery(query) {
            this.selectedTagsQuery = query;
        },

        nextMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate());
        },

        prevMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, this.currentDate.getDate());
        },

        updateNotes(notes) {
            this.notes = notes;
        },
    }
};
</script>

<style scoped>
.page-opacity-leave-active {
    transition: all 0.2s ease;
}

.page-opacity-enter-active {
    transition: all 0.5s ease;
}

.page-opacity-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.page-opacity-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
 