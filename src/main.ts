import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { DEBUG_MODE } from './config'
import plugins from './plugins'
import * as libComponents from './components/libs'
import { eachOwn } from '@/utils'
import '@/assets/css/theme/index'

Vue.config.productionTip = DEBUG_MODE

Vue.use(plugins)
eachOwn(libComponents, (component, name) => {
  Vue.component(name, component)
})

new Vue({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app')
