<template>
    <div id="account" class="
            w-screen
    ">

        <h1>Dashboard</h1>
        <button @click="disconnect">Disconnect</button>

        <p>Utilisation : {{ user.openaiCost }} $</p>
        <p>Utilisation : {{ getEurCost(user.openaiCost) }} €</p>

    </div>
</template>



<script setup>
import { computed, onMounted, ref } from 'vue';
import router from '../router/router.js';
import { getCurrentUser } from '../services/users/users.js';

const user = ref({})

onMounted(async () => {
    user.value = await getCurrentUser()
    user.value.openaiCost = user.value.openaiCost.toFixed(7)
})

const getEurCost = (cost) => {

    const eurCost = cost * 0.92

    return eurCost.toFixed(7)

}

const disconnect = () => {
    console.log('Try to disconnect...')
    localStorage.removeItem('token')

    router.push('/login')
}
</script>



<style lang="scss" scoped></style>