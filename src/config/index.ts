import {
  cipher
} from 'vma-vue-assist/dist/static/js/utils'

const config: any = cipher.decodeJSON(process.config)

export const nodeEnv: string = config.NODE_ENV
export const DEBUG_MODE: boolean = config.DEBUG_MODE
export const api: string = config.api
export const appNamespace: string = `${nodeEnv}/${config.app}`
