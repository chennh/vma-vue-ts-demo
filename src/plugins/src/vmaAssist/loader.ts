import { Loader } from 'vma-vue-element'

let requestCount = 0
let timer: any

export default {
  show() {
    requestCount++
    Loader.show()
  },
  hide(time = 500) {
    if (--requestCount <= 0) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        Loader.hide()
      }, time)
    }
  }
}
