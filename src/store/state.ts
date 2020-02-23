import {
  adminInfoSession
} from '@/storage'
// import LoginBO from '@/api/manage/v1.0/definitions/LoginBO'

type LoginBO = any

export interface State {
  // 版本号
  version: string
  // 当前登录用户
  adminInfo: LoginBO
  // 菜单映射map
  // resourceMenuMap: any
}

export default {
  version: '1.0.0',
  adminInfo: adminInfoSession.getJSON() as LoginBO,
  // resourceMenuMap: {}
}
