<template>
  <!-- Mobile -->
  <div class="mobile flex flex-col lg:hidden" v-if="screenType === 'mobile'">
    <Header @openModal="openModal" />

    <HeaderMenu v-if="modalMenuShow" @openModal="openModal" />

    <router-view v-show="!modalMenuShow" v-slot="{ Component }" class="w-full lg:static">
      <Transition name="page-opacity" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>

    <QuickEntry />
  </div>

  <!-- Desktop -->
  <div class="desktop hidden lg:flex flex-col" v-else>
    <div
      class="
      screen flex flex-row gap-8 2xl:gap-16
      w-full h-[calc(100vh-4rem)]
      px-8 pt-12 2xl:px-96
      bg-gradient-to-bl from-blue-300 to-cyan-400
      ">
      <div class="left_bar h-full w-[60px]">
        <LeftBar />
      </div>

      <div class="middle_bar h-full"
      :class="[
        path.meta.title === 'Today' ? 'w-4/6' : '',
        path.meta.title === 'Account' ? 'w-full' : '',
        path.meta.title === 'Notes' ? 'w-4/6' : '',
        path.meta.title === 'Note' ? 'w-4/6' : '',
        path.meta.title === 'Calendar' ? 'w-full' : '',
        path.meta.title === 'Journal' ? 'w-full' : '',
        path.meta.title === '404' ? 'w-full' : '',
      ]"
      >
        <MiddleBar :path="path" />
      </div>

      <div class="right_bar h-full
      transition-all duration-500"
      :class="[
        path.meta.title === 'Today' ? 'w-2/6' : '',
        path.meta.title === 'Account' ? 'w-0' : '',
        path.meta.title === 'Notes' ? 'w-2/6' : '',
        path.meta.title === 'Note' ? 'w-2/6' : '',
        path.meta.title === 'Calendar' ? 'w-0' : '',
        path.meta.title === 'Journal' ? 'w-0' : '',
        path.meta.title === '404' ? 'w-0' : '',
      ]"
      >
        <RightBar :path="path" />
      </div>
    </div>

    <QuickEntry />
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import HeaderMenu from "./components/Header/HeaderMenu.vue";
import QuickEntry from "./components/quickEntry.vue";
import LeftBar from "./components/Sidebar/LeftBar.vue";
import MiddleBar from "./components/Sidebar/MiddleBar.vue";
import RightBar from "./components/Sidebar/RightBar.vue";

export default {
  name: "App",

  components: {
    Header,
    HeaderMenu,
    QuickEntry,
    RightBar,
    LeftBar,
    MiddleBar
  },

  data() {
    return {
      modalMenuShow: false,
      modalMenu: false,
      screenType: "mobile",
      path: this.$route,
    };
  },

  methods: {
    openModal(modal) {
      if (modal === "Menu") {
        this.modalMenuShow = !this.modalMenuShow;
      }
    },

    updateScreenType() {
      this.screenType = window.innerWidth < 1024 ? "mobile" : "desktop";
    },
  },

  watch: {
    $route() {
      this.path = this.$route;
    }
  },

  mounted() {
    this.updateScreenType();
    window.addEventListener("resize", this.updateScreenType);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenType);
  },
};
</script>