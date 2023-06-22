<template>
    <header class="
    fixed top-0 left-0 z-50
    flex justify-between items-center w-full
    bg-gray-100
    touch-none
    lg:hidden
    ">
        <button @click="buttons.left.action" :class="buttons.left.type === 'none' ? 'invisible' : ''">{{ buttons.left.title
        }}
        </button>
        <h1 class="
        text-2xl font-bold
        ">{{ currentPage }}</h1>
        <button @click="buttons.right.action" :class="buttons.right.type === 'none' ? 'invisible' : ''">{{
            buttons.right.title }}
        </button>
    </header>
</template>

<script>
export default {
    name: 'Header',

    data() {
        return {
            currentPage: ''
        };
    },

    mounted() {
        this.currentPage = this.$route.meta.title
    },

    watch: {
        '$route'(to, from) {
            this.currentPage = to.meta.title;
        }
    },

    computed: {
        buttons() {
            if (this.currentPage && this.currentPage === 'Dashboard') {
                return {
                    left: {
                        title: 'Menu',
                        type: 'menu',
                        action: () => this.openModal('Menu')
                    },
                    right: {
                        title: 'None',
                        type: 'none',
                        action: () => console.log('None')
                    }
                }
            } else if (this.currentPage && this.currentPage === 'Test') {
                return {
                    left: {
                        title: 'Menu',
                        type: 'menu',
                        action: () => this.openModal('Menu')
                    },
                    right: {
                        title: 'Search',
                        type: 'search',
                        action: () => this.openModal('Search')
                    }
                }
            } else {
                return {
                    left: {},
                    right: {}
                };
            }
        },
    },

    methods: {
        openModal(modal) {
            this.$emit('openModal', modal);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

header {
    height: $headerHeight;
}
</style>