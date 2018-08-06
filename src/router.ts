import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import FirstStart from './views/Welcome.vue';
import Login from './views/Login.vue';
import Lobby from './views/Lobby.vue';

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
    {
        path: '/lobby',
        name: 'lobby',
        component: Lobby,
    },
];

export default new Router({routes});
