import Vue from 'vue';
import App from './App.vue';
import router from './router';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import VueApollo from 'vue-apollo';

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: '',
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Install the vue plugin
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  router,
  render: (h) => h(App),
}).$mount('#app');
