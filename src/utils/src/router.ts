import {
  MessageBox
} from 'element-ui'

export const resolveRouterComponent = (promise: Promise<any>) => {
  return promise.catch(e => {
    MessageBox.confirm('页面加载失败，点击确定或刷新页面重新加载', '系统提示', {
      type: 'warning',
      showClose: false,
      showCancelButton: false,
      callback(action) {
        if (action === 'confirm') {
          window.location.reload()
        }
      }
    })
  })
}

export const isTypesRouter = (routerName: string | undefined, types: any) => {
  return routerName
    && Object.keys(types).some(key => (types as any)[key] === routerName)
}

