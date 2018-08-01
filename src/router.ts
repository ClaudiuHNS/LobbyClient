import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import FirstStart from './views/Welcome.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const routes = [
    {
        path: (localStorage.getItem('path') == null) ? '/' : '/home',
        name: 'welcome',
        component: FirstStart,
    },
    {
        path: (localStorage.getItem('path') == null) ? '/login' : '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
];

export default new Router({routes});
