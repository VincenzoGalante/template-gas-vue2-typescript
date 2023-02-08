import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import GasPlugin from './plugins/gas';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(GasPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
