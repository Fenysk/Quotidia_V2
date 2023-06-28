<template>
    <div id="account" class="w-full h-full bg-gray-100 py-8">
        <div class="container mx-auto px-4">
            <button @click="disconnect"
                class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Disconnect</button>
            <div class="mt-8 bg-white rounded-lg p-6">
                <p class="text-lg font-semibold">Utilisation : <span class="font-normal">{{ user.openaiCost }} $</span></p>
                <p class="text-lg font-semibold mt-2">Utilisation : <span class="font-normal">{{ USDtoEUR(user.openaiCost)
                }} €</span></p>
            </div>

            <h2 class="text-2xl font-bold mt-12">Informations personnelles</h2>
            <form @submit.prevent="submit" class="mt-6 bg-white rounded-lg p-6">
                <div class="mt-4">
                    <label for="username" class="text-lg font-semibold mt-4">Username</label>
                    <input id="username" v-model="form.username" type="text"
                        class="w-full border border-gray-300 p-2 rounded mt-2">
                </div>

                <div class="mt-4">
                    <label for="email" class="text-lg font-semibold mt-4">Email</label>
                    <input id="email" v-model="form.email" type="email"
                        class="w-full border border-gray-300 p-2 rounded mt-2">
                </div>

                <div class="mt-4">
                    <label for="password" class="text-lg font-semibold mt-4">Password</label>
                    <input id="password" v-model="form.password" type="password"
                        class="w-full border border-gray-300 p-2 rounded mt-2">
                </div>

                <button type="submit"
                    class="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Save
                    Changes</button>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import router from '../router/router.js';
import { getCurrentUser, updateUser } from '../services/users/users.js';
import { USDtoEUR } from '../utils/currency.js';

const user = ref({});
const form = ref({});

onMounted(async () => {
    user.value = await getCurrentUser();
    user.value.openaiCost = user.value.openaiCost.toFixed(7);

    form.value = {
        username: user.value.username,
        email: user.value.email,
        password: ''
    };
});

const disconnect = async () => {
    console.log('Try to disconnect...');
    localStorage.clear();
    router.push('/login');
};

const submit = async () => {
    console.log('Updating account information...');
    await updateUser(form.value);
    user.value = await getCurrentUser();
};
</script>
