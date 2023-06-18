<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="register">
            <input type="text" v-model="username" placeholder="Username" />
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Register</button>
        </form>

        <button @click="$router.push('/login')">Je préfère me connecter</button>
    </div>
</template>
  
<script setup>
import { registerUser } from '../services/auth/auth';
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');

const register = async () => {
    try {
        console.log('Try to register...');
        await registerUser(username.value, email.value, password.value);
    } catch (error) {
        console.error('Registration failed:', error);
    }
};
</script>