import { VueConstructor } from 'vue'
import axiosPlugin from './src/axios'
import vmaAssistPlugin from './src/vmaAssist'
import elementUIPlugin from './src/elementUI'
import vmaDesignScrm from './src/vmaDesignScrm'
import vmaElement from './src/vmaElement'

export default {
  install(Vue: VueConstructor) {
    Vue.use(axiosPlugin)
    Vue.use(vmaAssistPlugin)
    Vue.use(elementUIPlugin)
    Vue.use(vmaDesignScrm)
    Vue.use(vmaElement)
  }
}
