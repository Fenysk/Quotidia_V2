import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ErrorView from '../views/ErrorView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/login'
    },

    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: ErrorView
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router