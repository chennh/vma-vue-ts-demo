import { VueConstructor } from 'vue'
import vmaDesignScrm from 'vma-design-scrm'

export default {
  install(Vue: VueConstructor) {
    Vue.use(vmaDesignScrm as any, {
      components: {
        panel: {
          appendTo: '.scrm-frame-main'
        }
      }
    })
  }
}
