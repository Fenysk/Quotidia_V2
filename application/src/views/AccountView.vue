<template>
    <div id="account">
        <button @click="disconnect">Disconnect</button>

        <p>Utilisation : {{ user.openaiCost }} $</p>
        <p>Utilisation : {{ USDtoEUR(user.openaiCost) }} €</p>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import router from '../router/router.js';
import { getCurrentUser } from '../services/users/users.js';
import { USDtoEUR } from '../utils/currency.js';

const user = ref({});

onMounted(async () => {
    user.value = await getCurrentUser();
    user.value.openaiCost = user.value.openaiCost.toFixed(7);
});

const disconnect = async () => {
    console.log('Try to disconnect...');
    localStorage.clear();
    router.push('/login');
};
</script>
  
<style lang="scss" scoped></style>
  