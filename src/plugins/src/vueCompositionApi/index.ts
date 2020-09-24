import { VueConstructor } from 'vue'
import VueCompositionApi from '@vue/composition-api'

export default {
  install(Vue: VueConstructor) {
    Vue.use(VueCompositionApi)
  }
}
