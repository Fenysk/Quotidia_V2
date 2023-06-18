<template>
    <div>
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