import { VueConstructor } from 'vue'
import vmaElement from 'vma-vue-element'
import 'vma-vue-element/dist/static/css/vmaElement.css'
import {
  getQiniuTokenUrl
} from '@/config'
import PopupManager from 'element-ui/lib/utils/popup/popup-manager'

export default {
  install(Vue: VueConstructor) {
    Vue.use(vmaElement as any, {
      components: {
        upload: {
          imageUpload: {
            defaultOptions: {
              // 图片限制10M
              singleFileSize: 10
            }
          },
          qiniu: {
            getQiniuTokenUrl
          }
        },
        popupManager: {
          nextZIndex() {
            return PopupManager.nextZIndex()
          }
        }
      }
    })
  }
}
