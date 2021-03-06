import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SettingsService from './services/settings.service'
import StorageService from './services/storage.service'
import CurrencyFormatterService from './services/currencyFormatter.service'
import Notifications from 'vue-notification'
import AlertService from './services/alert.service'

Vue.config.productionTip = false
Vue.prototype.$settings = SettingsService;
Vue.prototype.$storage = StorageService;
Vue.prototype.$currenctFormatter = CurrencyFormatterService;
Vue.prototype.$alerts = AlertService; 

Vue.use(Notifications);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
