<template>
    <div id="dashboard" class="
            w-screen
            h-screen
            bg-gray-300
    ">

        <h1>Dashboard</h1>
        <button @click="disconnect">Se déconnecter</button>

    </div>
</template>



<script setup>
import router from '../router/router.js'

const disconnect = () => {
    console.log('Try to disconnect...')
    localStorage.removeItem('token')
    router.push('/login')
}
</script>



<style lang="scss" scoped>

</style>



<script>
tailwind.config = {
    corePlugins: {
        preflight: true
    }
}
</script>