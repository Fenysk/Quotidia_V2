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

<script>
import { loginUser } from '../services/auth/auth'

export default {
    name: 'LoginView',

    data() {
        return {
            username: '',
            password: '',
        }
    },

    methods: {
        async login() {
            try {
                console.log('Try to login...')
                await loginUser(this.username, this.password)
                this.$router.push('/')
            } catch (error) {
                console.error('Login failed:', error)
            }
        },
    },
}
</script>