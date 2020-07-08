import { api, isDev } from '@/config'
import { macKeyCookie } from '@/storage/cookie/index'
import { VueAssist, VueOptions } from 'vma-assist'
import { VueConstructor } from 'vue'
import handleError from './handleError'
import Loader from './loader'

export default {
  install(Vue: VueConstructor) {
    Vue.use<VueOptions>(VueAssist, {
      plugins: {
        axios: {
          defaults: {
            baseURL: api
          },
          interceptor: {
            errorHandle: {
              error(error: any) {
                handleError(error)
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
            }
          }
        }
      }
    })
  }
}
