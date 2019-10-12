import { VueConstructor } from 'vue'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  install(Vue: VueConstructor) {
    Vue.use(elementUI)
  }
}
