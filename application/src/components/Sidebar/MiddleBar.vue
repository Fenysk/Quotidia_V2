<template>
    <div class="content h-full overflow-hidden transition-all duration-50
    rounded-t-lg
    " :class="[
        path.meta.title === 'Today' ? '' : 'bg-gray-100',
        path.meta.title === 'Account' ? 'bg-blue-100' : '',
        path.meta.title === 'Notes' ? 'bg-orange-100' : '',
    ]">
        <header :class="[
            path.meta.title === 'Today' ? 'h-0 py-0 overflow-hidden' : 'h-12',
            path.meta.title === 'Account' ? 'bg-blue-700' : '',
            path.meta.title === 'Notes' ? 'bg-yellow-700' : '',
            path.meta.title === 'Note' ? 'bg-yellow-700' : '',
            path.meta.title === '404' ? 'bg-gray-700' : '',
        ]" class="
            transition-all duration-500
            flex justify-between items-center
            font-bold text-xl text-white
        ">
            <p class="px-4 py-2 w-1/4">{{ path.meta.title }}</p>

            <NotesHeader v-if="path.meta.title === 'Notes'" class="w-3/4" @search="updateSearchQuery" />
            <NoteHeader v-if="path.meta.title === 'Note'" class="w-3/4" />



        </header>

        <div class="content flex
        h-[calc(100%-3rem)]
        overflow-hidden
        ">

            <div v-if="path.meta.title !== 'Today' &&
                path.meta.title !== 'Account' &&
                path.meta.title !== 'Note'" class="left_bar w-1/4">

            </div>


            <div :class="[
                path.meta.title === 'Today' ? 'w-full' : 'w-3/4',
                path.meta.title === 'Account' ? 'w-full' : 'w-3/4',
                path.meta.title === 'Note' ? 'w-full' : 'w-3/4',
            ]" class="content">
                <router-view v-slot="{ Component }">
                    <Transition name="page-opacity" mode="out-in">
                        <component :is="Component" :searchQuery="searchQuery" />
                    </Transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

  
<script>
import NotesHeader from '../Notes/NotesHeader.vue';
import NoteHeader from '../Notes/NoteHeader.vue';

export default {
    name: "MiddleBar",
    components: { NotesHeader, NoteHeader },
    
    props: {
        path: String,
    },
    data() {
        return {
            searchQuery: ""
        };
    },
    methods: {
        updateSearchQuery(query) {
            this.searchQuery = query;
        }
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
 