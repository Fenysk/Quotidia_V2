import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccountView from '../views/AccountView.vue'
import DashboardView from '../views/DashboardView.vue'
import ErrorView from '../views/ErrorView.vue'
import TestView from '../views/TestView.vue'
import NotesView from '../views/NotesView.vue'
import NoteView from '../views/NoteView.vue'
import { isValidToken } from '../services/auth/auth.js'

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/dashboard',
        meta: {
            title: 'Home'
        }
    },

    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: {
            title: 'Register'
        }
    },

    {
        path: '/account',
        name: 'account',
        component: AccountView,
        meta: {
            title: 'Account',
            requiresAuth: true,
        }
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        }
    },

    {
        path: '/notes',
        name: 'notes',
        component: NotesView,
        meta: {
            title: 'Notes',
            requiresAuth: true
        }
    },

    {
        path: '/notes/:id',
        name: 'note',
        component: NoteView,
        meta: {
            title: 'Note',
            requiresAuth: true
        }
    },

    {
        path: '/test',
        name: 'test',
        component: TestView,
        meta: {
            title: 'Test',
            requiresAuth: true
        }
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: ErrorView,
        meta: {
            title: '404'
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title} - Quotidia`;

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