import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';

Vue.use(Vuex);

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    logged: false,
    selectedIcon: 0,
  },
  mutations: {
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
