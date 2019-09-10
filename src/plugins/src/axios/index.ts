import axios from 'axios'
// import {
//   adminInfoSession
// } from '@/storage'

const getSessionId = () => {
  return ''
}

export default {
  install() {
    axios.interceptors.request.use((config: any) => {
      if (config.sessionId !== false) {
        Object.assign(config.headers, {
          session_id: getSessionId()
        })
      }
      return config
    })
  }
}
