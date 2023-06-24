<template>
    <div id="rightbar
    h-full
    ">
        <div class="widget widget--1
        overflow-hidden rounded-t-lg
        h-full
        ">
            <header :class="[
                path.meta.title === 'Today' ? 'bg-red-600' : '',
                path.meta.title === 'Account' ? 'bg-blue-700' : '',
                path.meta.title === 'Notes' ? 'bg-red-600' : '',
            ]" class="
                transition-all duration-500
                flex justify-between items-center
                font-bold text-xl px-4 py-2 text-white
            ">
                <p>{{ widget1 }}</p>
            </header>

            <div class="content block
            bg-white h-full
            ">
                <p>test</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "RightBar",

    props: {
        path: String,
    },

    data() {
        return {
            widget1: '',
            widget2: '',
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
                if (newPath.meta.title === 'Today') {
                    this.widget1 = 'Journal';
                } else if (newPath.meta.title === 'Notes') {
                    this.widget1 = 'Now';
                } else {
                    this.widget1 = null;
                }
            },
        },
    },

};
</script>
  