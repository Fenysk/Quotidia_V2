<template>
    <div id="Login" class="
        flex flex-col justify-center items-center
        h-screen w-screen
        bg-gray-100
    ">
        <h1 class="text-xl mb-4">Login</h1>
        <form @submit.prevent="login" class="flex flex-col gap-2 mb-4">
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
            password: ''
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
        }
    }
}
</script>
  

<style lang="scss" scoped>
button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
}
</style>