import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import StorageService from './services/storage.service';
import CurrencyFormatterService from './services/currencyFormatter.service'

Vue.config.productionTip = false
Vue.prototype.$storage = StorageService;
Vue.prototype.$currenctFormatter = CurrencyFormatterService;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
