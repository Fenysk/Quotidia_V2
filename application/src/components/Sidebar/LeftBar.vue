<template>
    <nav>
        <ul class="flex flex-col items-center justify-start gap-4">
            <li @click="goTo('/account')" class="account flex items-center justify-center bg-gray-200">
                <i class="fa-solid fa-user text-2xl text-gray-600"></i>
            </li>

            <li @click="goTo('/today')" class="tab today flex items-center justify-center bg-blue-200 rounded-xl">
                <i class="fa-solid fa-home text-2xl text-blue-600"></i>
            </li>

            <li @click="goTo('/notes')" class="tab notes flex items-center justify-center bg-yellow-200 rounded-xl">
                <i class="fa-solid fa-sticky-note text-2xl text-yellow-600"></i>
            </li>

            <li @click="goTo('/calendar')" class="tab calendar flex items-center justify-center bg-green-200 rounded-xl">
                <i class="fa-solid fa-calendar text-2xl text-green-600"></i>
            </li>

            <li @click="goTo('/journal')" class="tab journal flex items-center justify-center bg-red-200 rounded-xl">
                <i class="fa-solid fa-book-open text-2xl text-red-600"></i>
            </li>
        </ul>
    </nav>
</template>
  
<script>
export default {
    name: "LeftBar",

    methods: {
        goTo(path) {
            this.$router.push(path);
        }
    }
};
</script>
  
<style lang="scss" scoped>
.account,
.tab {
    width: 100%;
    aspect-ratio: 1/1;
    cursor: pointer;
}

.account {
    border-radius: 100%;
}
</style>
  