import { VueConstructor } from 'vue'
import vmaElement from 'vma-vue-element'
import 'vma-vue-element/dist/static/css/vmaElement.css'
import {
  getQiniuTokenUrl
} from '@/config'
import uuid from 'uuid'
import PopupManager from 'element-ui/lib/utils/popup/popup-manager'

export const generalUrl = (response: any) => {
  let attname = ''
  if (response.fname) {
    if (/\./.test(response.fname)) {
      attname = response.fname.replace(/,/g, '')
    } else {
      attname = `${response.fname}${response.ext}`
    }
  }
  return `${response.domain}/${response.key}?attname=${attname}`
}

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
            getQiniuTokenUrl,
            generalUrl,
            transferUploadOptions(opts: any, serverData: any) {
              let key = uuid()
              if (opts.file && opts.file.type) {
                const fileType = opts.file.type
                if (/^image/i.test(fileType)) {
                  // 图片
                  key = `IMG-H-${key}`
                } else if (/^audio/i.test(fileType)) {
                  // 音频
                  key = `AUDIO-H-${key}`
                } else if (/^video/i.test(fileType)) {
                  // 视频
                  key = `VIDEO-H-${key}`
                } else {
                  // 其他
                  key = `OTHER-H-${key}`
                }
              }
              opts.action = serverData.zoneUrl
              Object.assign(opts.data, {
                token: serverData.token,
                key
              })
              return opts
            }
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
