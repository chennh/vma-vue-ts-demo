import { api, isDev } from '@/config'
import { macKeyCookie } from '@/storage/cookie/index'
import vmaAssist from 'vma-vue-assist'
import { VueConstructor } from 'vue'
import Loader from './loader'

export default {
  install(Vue: VueConstructor) {
    Vue.use(vmaAssist as any, {
      plugins: {
        axios: {
          defaults: {
            baseURL: api
          },
          interceptor: {
            errorHandle: {
              handleError(error: any) {
                return Promise.reject(error)
              }
            },
            loading: {
              showLoader() {
                Loader.show()
              },
              hideLoader() {
                Loader.hide()
              }
            },
            authorization: {
              debug: isDev,
              getMacKey() {
                return macKeyCookie.get() || ''
              }
            },
            returnResponseData: true
          }
        }
      }
    })
  }
}
