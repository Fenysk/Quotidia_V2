<template>
  <router-view v-slot="{ Component }">
    <Transition name="page-opacity" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<script setup>
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
