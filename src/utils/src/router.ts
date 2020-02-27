import { RouteConfig } from 'vue-router'
import {
  MessageBox
} from 'element-ui'

interface RouterName {
  [prop: string]: string
}

export class RouterWrapper<T extends RouterName> {

  public static resolveRouterComponent(promise: Promise<any>): Promise<any> {
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

  public static isRouterExists(routerName: string | null | undefined) {
    return RouterWrapper.routerWrappers.some(routerWrapper => routerWrapper.isRouter(routerName))
  }

  private static routerWrappers: Array<RouterWrapper<RouterName>> = []

  constructor(
    public types: T,
    public routes: RouteConfig[]
  ) {
    RouterWrapper.routerWrappers.push(this)
  }

  public isRouter(routerName: string | null | undefined): boolean {
    return !!routerName
      && Object.keys(this.types).some(key => this.types[key] === routerName)
  }
}
