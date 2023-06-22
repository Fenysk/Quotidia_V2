<template>
    <header :class="'bg-' + header.color + '-500'"
    class="
    fixed top-0 left-0 z-50
    flex justify-between items-center w-full
    touch-none
    lg:hidden
    ">
        <button @click="header.buttonLeft.action" :class="header.buttonLeft.type === 'none' ? 'invisible' : ''">{{ header.buttonLeft.title
        }}
        </button>
        <h1 class="text-2xl font-bold">{{ currentPage }}</h1>
        <button @click="header.buttonRight.action" :class="header.buttonRight.type === 'none' ? 'invisible' : ''">{{
            header.buttonRight.title }}
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
        header() {
            if (this.currentPage && this.currentPage === 'Dashboard') {
                return {
                    buttonLeft: {
                        title: 'Menu',
                        type: 'menu',
                        action: () => this.openModal('Menu')
                    },
                    buttonRight: {
                        title: 'None',
                        type: 'none',
                        action: () => console.log('None')
                    },
                    color: 'blue'
                }
            } else if (this.currentPage && this.currentPage === 'Test') {
                return {
                    buttonLeft: {
                        title: 'Menu',
                        type: 'menu',
                        action: () => this.openModal('Menu')
                    },
                    buttonRight: {
                        title: 'None',
                        type: 'none',
                        action: () => console.log('None')
                    },
                    color: 'pink'
                }
            } else if (this.currentPage && this.currentPage === 'Notes') {
                return {
                    buttonLeft: {
                        title: 'Menu',
                        type: 'menu',
                        action: () => this.openModal('Menu')
                    },
                    buttonRight: {
                        title: 'Search',
                        type: 'search',
                        action: () => this.openModal('Seach')
                    },
                    color: 'yellow'
                }
            } else if (this.currentPage && this.currentPage === 'Note') {
                return {
                    buttonLeft: {
                        title: 'Menu',
                        type: 'menu',
                        action: () => this.openModal('Menu')
                    },
                    buttonRight: {
                        title: 'Filters',
                        type: 'filters',
                        action: () => this.openModal('Filters')
                    },
                    color: 'red'
                }
            } else if (this.currentPage && this.currentPage === '404') {
                return {
                    buttonLeft: {
                        title: 'Menu',
                        type: 'menu',
                        action: () => this.openModal('Menu')
                    },
                    buttonRight: {
                        title: 'None',
                        type: 'none',
                        action: () => console.log('None')
                    },
                    color: 'gray'
                }
            } else {
                return {
                    buttonLeft: {},
                    buttonRight: {}
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