import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { DEBUG_MODE } from './config'

Vue.config.productionTip = DEBUG_MODE

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
