import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import ErrorView from '../views/ErrorView.vue'
import TestView from '../views/TestView.vue'
import { isValidToken } from '../services/auth/auth.js'

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
        path: '/test',
        name: 'test',
        component: TestView,
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

router.beforeEach(async (to, from, next) => {
    const hasToken = localStorage.getItem('token');

    if (hasToken) {
        try {
            const resultToken = await isValidToken(hasToken);
            console.log('isValidToken:', resultToken);

            if (to.meta.requiresAuth && !resultToken) {
                
                next({ name: 'login' });

            } else {

                next();

            }
        } catch (error) {
            localStorage.removeItem('token');

            console.error('Error:', error);
            next({ name: 'login' });
        }
    } else {
        if(to.meta.requiresAuth){
            
            next({ name: 'login' });

        } else {
            
            next();
        }
    }
});


export default router;