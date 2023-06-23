<template>
  <Header @openModal="openModal" />

  <HeaderMenu v-if="modalMenuShow" @openModal="openModal" />


  <router-view v-show="!modalMenuShow" v-slot="{ Component }" class="
      absolute top-16 left-0 h-[calc(100vh-4rem)] w-full touch-none
      lg:static lg:h-screen
  ">
    <Transition name="page-opacity" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>

  <QuickEntry />
</template>

<script>
import Header from "./components/Header/Header.vue";
import HeaderMenu from "./components/Header/HeaderMenu.vue";
import QuickEntry from "./components/quickEntry.vue";

export default {
  name: "App",

  components: {
    Header,
    HeaderMenu,
    QuickEntry
  },

  data() {
    return {
      modalMenuShow: false,
      modalMenu: false,
    };
  },

  methods: {
    openModal(modal) {
      if (modal === "Menu") {
        this.modalMenuShow = !this.modalMenuShow;
      }
    },
  },

};
</script>

<style scoped>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: all 0.5s ease;
}

.page-opacity-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.page-opacity-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
