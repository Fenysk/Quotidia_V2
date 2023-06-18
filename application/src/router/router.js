import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ErrorView from '../views/ErrorView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/dashboard'
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
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
            requiresAuth: true
        }
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

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token');

    if (to.meta.requiresAuth && !isLoggedIn) {
        // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
        next({ name: 'login' });
    } else {
        // Autoriser l'accès à la route
        next();
    }
});

export default router;