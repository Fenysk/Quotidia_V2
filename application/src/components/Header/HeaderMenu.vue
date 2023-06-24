<template>
    <div class="modalMenu fixed top-16 left-0 z-50 w-full bg-white">
        <nav class="h-full w-full">
            <ul class="flex flex-col items-center h-full gap-2 text-xl mt-16">
                <li class="border-y-2 border-black py-2 px-[10%] w-full">
                    <router-link @click="openModal('Menu')" to="/today">Today</router-link>
                </li>
                <li class="border-y-2 border-black py-2 px-[10%] w-full">
                    <router-link @click="openModal('Menu')" to="/notes">Notes</router-link>
                </li>
                <li class="border-y-2 border-black py-2 px-[10%] w-full">
                    <router-link @click="openModal('Menu')" to="/calendar">Calendrier</router-link>
                </li>
                <li class="border-y-2 border-black py-2 px-[10%] w-full">
                    <router-link @click="openModal('Menu')" to="/test">Test</router-link>
                </li>
                <li class="border-y-2 border-black py-2 px-[10%] w-full">
                    <router-link @click="openModal('Menu')" to="/journal">Journal</router-link>
                </li>
                <li class="border-y-2 border-black py-2 px-[10%] w-full">
                    <router-link @click="openModal('Menu')" to="/account">Mon compte</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
  
<script>
export default {
    name: "App",

    props: {
        modalMenuShow: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        openModal(modal) {
            this.$emit('openModal', modal);
        },
    },
};
</script>
  
<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.modalMenu {
    height: calc(100vh - #{$headerHeight} - #{$footerHeight});
}
</style>
  