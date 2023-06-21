<template>
    <div>
        <button @click="router.push('/dashboard')">Aller au dashboard</button>
        <h1>Page de test</h1>
        <button @click="disconnect">Se déconnecter</button>
        <CRUDnotes />
        <quickEntry />
        <openaiTest2 />
        <openaiTest1 />
    </div>
</template>

<script setup>
import router from '../router/router.js'
import openaiTest1 from '../components/test/openaiTest1.vue'
import quickEntry from '../components/test/quickEntry.vue'
import openaiTest2 from '../components/test/openaiTest2.vue'
import CRUDnotes from '../components/test/CRUDnotes.vue'

const disconnect = () => {
    console.log('Try to disconnect...')
    localStorage.removeItem('token')
    router.push('/login')
}
</script>