import { VueConstructor } from 'vue'
import vmaAssist from 'vma-vue-assist'

export default {
  install(Vue: VueConstructor) {
    Vue.use(vmaAssist as any, {})
  }
}