import {
  Loading
} from 'element-ui'

let instance: any = null
const options = {
  fullscreen: true,
  lock: true,
  text: '拼命加载中...',
  background: 'RGBA(255, 255, 255, .25)'
}

const getInstance = () => {
  // 有可能会出现多实例情况？
  const mask = document.querySelector('.el-loading-mask')
  if (mask && mask.parentNode) {
    mask.parentNode.removeChild(mask)
  }
  instance = Loading.service(options)
  return instance
}

export default {
  show() {
    getInstance()
  },
  hide() {
    if (instance) {
      instance.close()
      instance = null
    }
  }
}
