import { RouterWrapper } from 'vma-assist/dist/static/js/tools/vue'
import { MessageBox } from 'element-ui'

RouterWrapper.extendConfig({
  confirm() {
    return new Promise((resolve, reject) => {
      MessageBox.confirm('页面加载失败，点击确定或刷新页面重新加载', '系统提示', {
        type: 'warning',
        showClose: false,
        showCancelButton: false,
        callback(action) {
          if (action === 'confirm') {
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  }
})

export * from 'vma-assist/dist/static/js/utils'
export * from 'vma-assist/dist/static/js/tools/vue'


