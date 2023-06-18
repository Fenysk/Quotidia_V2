<template>
    <div>
        <h1>Dashboard</h1>
        <button @click="disconnect">Se déconnecter</button>
        <openaiTest />
    </div>
</template>

<script setup>
import router from '../router/router.js'
import openaiTest from '../components/openaiTest.vue';

const disconnect = () => {
    console.log('Try to disconnect...')
    localStorage.removeItem('token')
    router.push('/login')
}
</script>