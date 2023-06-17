<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Username" />
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
        </form>

        <button @click="$router.push('/login')">Je préfère me connecter</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const register = () => {
    console.log('Register :', username.value, password.value)
}
</script>