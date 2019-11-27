import { VueConstructor } from 'vue'
import vmaAssistPlugin from './src/vmaAssist'
import elementUIPlugin from './src/elementUI'
import vmaDesignScrm from './src/vmaDesignScrm'
import vmaElement from './src/vmaElement'
import { fmt } from '@/utils'

export default {
  install(Vue: VueConstructor) {
    Vue.use(vmaAssistPlugin)
    Vue.use(elementUIPlugin)
    Vue.use(vmaDesignScrm)
    Vue.use(vmaElement)

    Vue.prototype.fmt = fmt
  }
}
