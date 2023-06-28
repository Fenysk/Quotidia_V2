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

    <div class="
      screen flex flex-row gap-[4%]
      w-full h-[calc(100vh-4rem)]
      pt-12 px-8 xl:px-[10%]
      bg-gradient-to-bl from-blue-300 to-cyan-400
      transition-all duration-500
      ">

      <div class="left_bar h-full w-[60px]">
        <LeftBar />
      </div>

      <MiddleBar :path="path"
      :class="[
        path.name === 'account' ? 'w-full' : '',
        path.name === 'today' ? 'w-4/6' : '',
        path.name === 'notes' ? 'w-4/6' : '',
        path.name === 'note' ? 'w-4/6' : '',
        path.name === 'calendar' ? 'w-full' : '',
        path.name === 'journal' ? 'w-full' : '',
      ]"
      />

      <RightBar class="w-2/6" :path="path"
      v-if="
        path.name === 'today' ||
        path.name === 'notes' ||
        path.name === 'note'
      "/>

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