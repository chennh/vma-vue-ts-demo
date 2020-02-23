import {
  Message,
  MessageBox
} from 'element-ui'
import {
  redirectToLogin,
  redirectToCommonMaintain
} from '@/router'
import {
  isDev
} from '@/config'
import store from '@/store'
import * as actionTypes from '@/store/actionTypes'
// import { AccountApi } from '@/api/manage/v1.0/accountApi'
import {
  adminInfoSession,
  adminInfoSessionHasData
} from '@/storage'
import { AxiosError } from 'axios'

const ElMessage = Message as any
const ElMessageBox = MessageBox as any

function handleError(data: any) {
  ElMessage({
    // 格式待定
    message: data.message,
    type: 'warning',
    duration: 10000
  })
}

let exceptionMessageHasShow = false

function handleException(error: any) {
  const {
    status,
    message,
    stack
  } = error
  if (exceptionMessageHasShow === false) {
    if (isDev) {
      ElMessageBox({
        title: message || '系统提示',
        message: `<div style='max-height: 250px; overflow: auto;'>${stack}</div>`,
        type: 'error',
        showClose: true,
        dangerouslyUseHTMLString: true,
        duration: 15,
        callback() {
          exceptionMessageHasShow = false
        }
      })
    } else {
      ElMessageBox({
        title: '系统提示',
        message: '服务繁忙，请稍后再试',
        type: 'error',
        showClose: true,
        dangerouslyUseHTMLString: true,
        duration: 15,
        callback() {
          exceptionMessageHasShow = false
        }
      })
    }
    exceptionMessageHasShow = true
  }
}

let onHandling401 = false
export function handle401(response: any) {
  if (!onHandling401) {
    onHandling401 = true
    let message = ''
    switch (String(response.code).toUpperCase()) {
      case 'KICK_OUT':
        message = '您的账号已被踢下线'
        break
      case 'AUTHORIZATION_NONCE_TIMESTAMP_INVALID':
        message = '系统时间与服务时间差异过大，请校对系统时间'
        break
      default:
        message = '授权过期，请重新登录'
    }
    // 登录状态下才做401提示
    if (adminInfoSessionHasData()) {
      handleError({
        message
      })
    }
    adminInfoSession.remove()
    // 未登录/登录授权过期
    redirectToLogin()
    setTimeout(() => {
      onHandling401 = false
    }, 500)
  }
}

let onMaintaining = false
export function handleMaintain(response: any) {
  if (!onMaintaining) {
    onMaintaining = true
    // AccountApi.menuList().catch(e => {
    //   handleResponseError(e, () => {
    //     handleMaintainError(response)
    //   })
    // }).finally(() => {
    //   onMaintaining = false
    // })
  }
}

export function handleMaintainError(response: any) {
  store.dispatch(actionTypes.AFTER_LOGOUT)
  redirectToCommonMaintain()
  handleError({
    message: '系统维护中，请稍候'
  })
}

export function handleResponseError(error: AxiosError, handleMaintainFn: (data?: any) => void) {
  if (error.response == null) {
    if (error.message === 'Network Error') {
      handleMaintainFn({})
    } else {
      handleException({
        status: 500,
        message: error.message,
        stack: error.stack
      })
    }
  } else {
    if (error.response.status === 401) {
      handle401(error.response.data || {})
    } else if (error.response.status === 502) {
      handleMaintainFn(error.response)
    } else if (error.response.data != null) {
      if (error.response.data.businessException === true) {
        handleError(error.response.data)
      } else {
        handleException({
          status: error.response.status,
          message: error.message,
          stack: (error.response.data.stackTrace || []).map((v: any) => `${v.className}.${v.methodName}(${v.lineNumber})`)
            .join('<br />')
        })
      }
    } else {
      handleException({
        status: error.response.status,
        message: error.message,
        stack: error.stack
      })
    }
  }
}

export default (error: AxiosError) => {
  handleResponseError(error, response => {
    handleMaintain(response)
  })
}
