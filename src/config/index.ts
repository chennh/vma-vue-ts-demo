import {
  cipher
} from 'vma-vue-assist/dist/static/js/utils'

const config: any = cipher.decodeJSON(process.config)

export const nodeEnv: string = config.NODE_ENV
export const DEBUG_MODE: boolean = config.DEBUG_MODE
export const isDev = config.NODE_ENV === 'dev' || config.NODE_ENV === 'development'
export const api: string = config.api
export const appNamespace: string = `${nodeEnv}/${config.app}`
export const loginInfo = {
  bg: 'https://keji-res.h5h5h5.cn/5ad9c87a-5c3f-4466-b990-8eb9e40e0a0d',
  logo: 'https://keji-res.h5h5h5.cn/IMG-H-22987d60-13c2-4d9f-abab-931634572289',
  hotLine: '0593-6699969',
  caseNumber: '闽ICP-01025154211',
  copyRight: '福建微码信息科技有限公司',
  qrCode: 'https://keji-res.h5h5h5.cn/1c792a07-016d-45f0-8d3d-d2ae0ff3bebe',
  technicalSupport: '福建微码信息科技有限公司'
}
export const ckeditorUploadUrl = `${api}/common/v1.0/image/editor`
export const getQiniuTokenUrl = () => `${api}/common/v1.0/image/qiniutoken`
