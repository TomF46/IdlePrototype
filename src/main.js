import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import StorageService from './services/storage.service';

Vue.config.productionTip = false
Vue.prototype.$storage = StorageService;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
