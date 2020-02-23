<template>
  <div class="page-login"
       :style="{backgroundImage: `url('${loginInfo.bg}')`}">
    <div class="login-header">
      <ul class="login-header-info">
        <li>
          <ins>客服热线：{{loginInfo.hotLine}}</ins>
        </li>
        <li>
          <el-popover placement="bottom-start"
                      trigger="hover"
                      popper-class="login-pub-code">
            <ins slot="reference"
                 class="cursor">
              <i class="icon icon-login-gongzhonghao"></i>
              关注微信公众号
            </ins>
            <img :src="loginInfo.qrCode" />
          </el-popover>
        </li>
      </ul>
      <img :src="loginInfo.logo"
           class="login-logo">
    </div>
    <div class="login-box">
      <form class="login-form">
        <slot name="loginType">
          &nbsp;&nbsp;
        </slot>
        <div class="login-form-item">
          <login-form-input placeholder="请输入登录账号"
                            icon="icon-login-zhanghao"
                            class="animated"
                            :class="{'shake invalid': !validate.account.valid}"
                            :maxlength="20"
                            v-model="entity.account"
                            @blur="onBlurAccount"
                            @enter="login"
                            ref="account" />
        </div>
        <div class="login-form-item">
          <login-form-input type="password"
                            placeholder="请输入登录密码"
                            icon="icon-login-mima"
                            class="animated"
                            :class="{'shake invalid': !validate.password.valid}"
                            :maxlength="20"
                            v-model="entity.password"
                            @blur="onBlurPassword"
                            @enter="login" />
        </div>
        <div class="login-form-item">
          <div class="login-form-code">
            <div class="code-img"
                 @click="clickQRCode">
              <img :src="qrCodeUrl">
            </div>
            <login-form-input placeholder="请输入验证码"
                              icon="icon-login-yanzhengma"
                              class="animated"
                              :class="{'shake invalid': !validate.qrCode.valid}"
                              :maxlength="4"
                              v-model="entity.code"
                              @blur="onBlurQRCode"
                              @enter="login"
                              ref="qrCode" />
          </div>
        </div>
        <div class="login-form-item">
          <el-button type="primary"
                     class="login-form-btn animated"
                     @click="login">登录</el-button>
        </div>
        <div class="login-form-item">
          <el-checkbox class="login-form-remember"
                       v-model="rememberMe">记住我</el-checkbox>
        </div>
      </form>
    </div>
    <div class="login-footer">
      技术支持：{{loginInfo.technicalSupport}} (推荐使用谷歌浏览器、火狐浏览器以及360极速浏览器)
      <br />
      网站ICP备案号：{{loginInfo.caseNumber}} Copyright {{loginInfo.copyRight}} 版权所有
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Emit } from 'vue-property-decorator'
import { Message } from 'element-ui'
import { Action } from 'vuex-class'
import LoginFormInput from '@/components/packages/login/loginFormInput/index.vue'
import loading from '@/components/libs/loading'
import {
  loginRememberMeLocal,
  loginAccountLocal,
  broadcastLoginLocal
} from '@/storage'
import { loginInfo } from '@/config'
// import { HomeApi } from '@/api/common/v1.0/homeApi'
// import HomeLoginParam from '@/api/common/v1.0/params/HomeLoginParam'
import { redirectToHome } from '@/router'
import RSAUtils from '@/assets/vendors/rsa'
import * as actionTypes from '@/store/actionTypes'

const ElMessage = Message as any

@Component({
  components: {
    LoginFormInput
  }
})
export default class Login extends Vue {
  // 登录参数
  private entity = {
    account: '',
    password: '',
    qrCode: '',
    code: ''
  } // = new HomeLoginParam()
  // 校验
  private validate = {
    account: {
      valid: true
    },
    password: {
      valid: true
    },
    qrCode: {
      valid: true
    }
  }
  // 记住我
  private rememberMe = loginRememberMeLocal.get() === 'true'
  // 验证码图片
  private qrCodeUrl = ''
  // 登录页相关信息
  private loginInfo = loginInfo

  private loginBroadIndex = -1

  @Action(actionTypes.AFTER_LOGIN)
  private afterLogin: any

  private created() {
    this.refreshQRCode()

    // 注册登录广播事件
    this.loginBroadIndex = broadcastLoginLocal.onBroadcast(() => {
      location.reload()
    })
  }

  private mounted() {
    this.$nextTick(() => {
      const accountRef = this.$refs.account as LoginFormInput
      accountRef.focus()
    })
  }

  private destroyed() {
    broadcastLoginLocal.offBroadcast(this.loginBroadIndex)
  }

  // 登录
  private async login() {
    // if (
    //   this.validateAccount() &&
    //   this.validatePassword() &&
    //   this.validateQRCode()
    // ) {
    //   const entity = Object.assign({}, this.entity)
    //   loading.show()
    //   try {
    //     const { randomIndex, exponent, modulus } = await HomeApi.getEncryption({
    //       loading: false
    //     })
    //     RSAUtils.setMaxDigits(200)
    //     // 第一个参数为加密指数、第二个参数为解密参数、第三个参数为加密系数
    //     const key = RSAUtils.getKeyPair(exponent, '', modulus)
    //     entity.password = RSAUtils.encryptedString(key, entity.password)
    //     entity.randomIndex = randomIndex
    //     const loginBO = await HomeApi.login(entity, { loading: false })
    //     if (
    //       !loginBO ||
    //       !loginBO.resourceMenuList ||
    //       loginBO.resourceMenuList.length === 0
    //     ) {
    //       this.warning('暂无权限，请联系管理员')
    //     } else {
    //       this.resetRememberMe(entity.account)
    //       ElMessage.closeAll()
    //       this.afterLogin(loginBO)
    //       redirectToHome()
    //       broadcastLoginLocal.random()
    //     }
    //   } catch (e) {}
    //   loading.hide()
    // }
  }

  // 点击验证码图片时，刷新验证码
  private clickQRCode() {
    // this.refreshQRCode()
    // this.entity.code = ''
    // if (this.$refs.qrCode) {
    //   const qrCode = this.$refs.qrCode as any
    //   qrCode.select()
    // }
  }

  // 刷新验证码
  private refreshQRCode() {
    // HomeApi.getVerificationCode().then(data => {
    //   this.entity.codeIndex = data.index
    //   this.qrCodeUrl = /^data/i.test(data.code)
    //     ? data.code
    //     : `data:image/png;base64,${data.code}`
    // })
  }

  // 校验账号
  private validateAccount(account: string = this.entity.account) {
    return (this.validate.account.valid = !!account)
  }

  // 校验密码
  private validatePassword(password: string = this.entity.password) {
    return (this.validate.password.valid = !!password)
  }

  // 校验验证码
  private validateQRCode(qrCode: string = this.entity.code) {
    return (this.validate.qrCode.valid = !!qrCode && /^.{4}$/.test(qrCode))
  }

  private onBlurAccount() {
    this.validateAccount(this.entity.account)
  }

  private onBlurPassword() {
    this.validatePassword(this.entity.password)
  }

  private onBlurQRCode() {
    this.validateQRCode(this.entity.code)
  }

  // 重新设置[记住我]
  private resetRememberMe(account: string) {
    const rememberMe = this.rememberMe
    loginRememberMeLocal.set(rememberMe)
    if (rememberMe) {
      loginAccountLocal.set(account)
    } else {
      loginAccountLocal.remove()
    }
  }

  // 账号输入框获得焦点
  private focusAccount() {
    if (this.$refs.account) {
      const accountRef = this.$refs.account as LoginFormInput
      accountRef.focus()
      accountRef.select()
    }
  }
}
</script>
