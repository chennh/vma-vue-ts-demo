import { VueConstructor } from 'vue'
import vmaElement from 'vma-vue-element'
import 'vma-vue-element/dist/static/css/vmaElement.css'

export default {
  install(Vue: VueConstructor) {
    Vue.use(vmaElement as any, {})
  }
}
