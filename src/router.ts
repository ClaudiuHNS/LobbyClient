import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import FirstStart from './views/Welcome.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: FirstStart,
    },
      {
        path: '/login',
          name: 'login',
          component: Login,
      },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
  ],
});
