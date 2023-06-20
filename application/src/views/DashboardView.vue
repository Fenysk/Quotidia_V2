<template>
    <div>
        <h1>Dashboard</h1>
        <button @click="disconnect">Se déconnecter</button>
        <openaiTest1 />
        <quickEntry />
        <openaiTest2 />
    </div>
</template>

<script setup>
import router from '../router/router.js'
import openaiTest1 from '../components/test/openaiTest1.vue'
import quickEntry from '../components/quickEntry.vue'
import openaiTest2 from '../components/test/openaiTest2.vue'

const disconnect = () => {
    console.log('Try to disconnect...')
    localStorage.removeItem('token')
    router.push('/login')
}
</script>