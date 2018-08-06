import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';

Vue.use(Vuex);

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faCog, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes);
library.add(faCog);
library.add(faMinus);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueMaterial);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    logged: false,
    selectedIcon: 0,
    installedPackages: {},
  },
  mutations: {
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
