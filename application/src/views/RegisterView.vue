<template>
    <div id="Login" class="
        flex flex-col justify-center items-center
        h-screen w-screen
        bg-gray-100
    ">
        <h1 class="text-xl mb-4">Register</h1>
        <form @submit.prevent="register" class="flex flex-col gap-2 mb-4">
            <input type="text" v-model="username" placeholder="Username" />
            <input type="email" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Register</button>
        </form>

        <button @click="$router.push('/login')">Je préfère me connecter</button>
    </div>
</template>
    
  
<script>
import router from '../router/router.js';
import { registerUser } from '../services/auth/auth';

export default {
    name: 'RegisterView',

    data() {
        return {
            username: '',
            email: '',
            password: ''
        };
    },

    methods: {
        async register() {
            try {
                console.log('Try to register...');
                await registerUser(this.username, this.email, this.password);
                router.push('/');
            } catch (error) {
                console.error('Registration failed:', error);
            }
        }
    },
};
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