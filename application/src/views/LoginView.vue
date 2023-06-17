<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
        </form>

        <button @click="$router.push('/register')">Je préfère m'inscrire</button>
    </div>
</template>

<script setup>
import { loginUser } from '../services/users'
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const login = async () => {
    try {
        console.log('Try to login...')
        await loginUser(username.value, password.value)
    } catch (error) {
        console.error('Login failed:', error)
    }
}
</script>