<template>
    <div class="content h-full overflow-hidden transition-all duration-50
    rounded-t-lg
    ">
        <header :class="[
            path.meta.title === 'Today' ? 'bg-red-700' : '',
            path.meta.title === 'Account' ? 'bg-blue-700' : '',
            path.meta.title === 'Notes' ? 'bg-red-700' : '',
            path.meta.title === 'Note' ? 'bg-yellow-700' : '',
            path.meta.title === 'Calendar' ? 'bg-green-700' : '',
            path.meta.title === 'Journal' ? 'bg-red-700' : '',
        ]" class="
            transition-all duration-500
            flex justify-between items-center
            font-bold text-xl text-white
            overflow-hidden
        ">
            <p v-if="path.meta.title === 'Today'"
            class="px-4 py-2 w-1/4">Journal</p>
            <p v-if="path.meta.title === 'Notes'"
            class="px-4 py-2 w-1/4">Maintenant</p>
        </header>

        <div class="w-full h-full bg-white bg-opacity-80 bg-blur">
            <TodayRightbar v-if="path.meta.title === 'Today'" class="w-full" />
        </div>

    </div>
</template>
  
<script>
import TodayRightbar from '../Today/TodayRightbar.vue';

export default {
    name: "RightBar",
    components: { TodayRightbar },

    props: {
        path: String,
    },
    data() {
        return {
            widget1: "",
            widget2: "",
            currentDate: new Date().toLocaleString(),
        };
    },
    methods: {
        updateDate() {
            return setInterval(() => {
                this.currentDate = new Date().toLocaleString().split(",")[0];
            }, 1000);
        },
    },
    mounted() {
        this.updateDate();
    },
    watch: {
        path: {
            handler(newPath) {
                if (newPath.meta.title === "Today") {
                    this.widget1 = "Journal";
                }
                else if (newPath.meta.title === "Notes") {
                    this.widget1 = "Now";
                }
                else {
                    this.widget1 = null;
                }
            },
        },
    },
};
</script>
  