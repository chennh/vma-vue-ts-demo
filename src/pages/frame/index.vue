<template>
  <scrm-frame>
    <scrm-frame-header slot="header"
                       :logo="adminInfo.logo || localLogo || loginInfo.logo">

      <!-- 右侧，头像、操作 -->
      <ul slot="right">
        <li>
          <el-dropdown class="scrm-frame-header-admin">
            <span class="el-dropdown-link">
              {{adminInfo.name || adminInfo.account}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordModule.show">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </scrm-frame-header>

    <!-- 菜单栏 -->
    <scrm-frame-menu slot="menu"
                     :list="menuList"
                     v-model="activeMenuId"
                     @click="navigateToMenu" />

    <!-- 主要内容区域 -->
    <transition mode="out-in"
                enter-active-class="fadeInUpBig"
                leave-active-class="fadeOutUpBig">
      <router-view class="container animated" />
    </transition>

    <el-dialog title="修改密码"
               :visible.sync="updatePasswordModule.visible"
               append-to-body
               destroy-on-close
               width="520px">
      <update-password @submit="updatePasswordModule.submit"
                       @cancel="updatePasswordModule.cancel"
                       v-if="updatePasswordModule.visible" />
    </el-dialog>
  </scrm-frame>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { broadcastLogoutLocal, frameActiveMenuSession } from '@/storage'
import { loginInfo } from '@/config'
// import LoginBO from '@/api/common/v1.0/definitions/LoginBO'
// import RbacResourceMenuBO from '@/api/common/v1.0/definitions/RbacResourceMenuBO'
// import { AccountApi } from '@/api/common/v1.0/accountApi'
import FrameMenu from './definitions/FrameMenu'
import UpdatePassword from './components/updatePassword/index.vue'
import { VueModule } from '@/utils'
import LocalLogo from '@/assets/images/logo.png'
import * as actionTypes from '@/store/actionTypes'

@Component({
  components: {
    UpdatePassword
  }
})
export default class Frame extends Vue {
  // private loginInfo = loginInfo
  // // 当前激活的菜单
  // private activeMenuId = frameActiveMenuSession.get()
  // private logoutBroadIndex = -1
  // @State
  // private adminInfo!: LoginBO
  // @Action(actionTypes.LOGOUT_BROADCAST)
  // private logoutBroadcast: any
  // @Action(actionTypes.LOGOUT)
  // private logout: any
  // // 本地logo
  // private localLogo: any = LocalLogo
  // private data() {
  //   return {
  //     updatePasswordModule: VueModule.create({
  //       submit: () => {
  //         this.success('修改密码成功，请重新登录')
  //         this.logout()
  //       }
  //     })
  //   }
  // }
  // private get menuList() {
  //   let activeMenu: FrameMenu | null = null
  //   const loopMenu = (list: RbacResourceMenuBO[]): FrameMenu[] => {
  //     if (list && list.length) {
  //       return list.map<FrameMenu>(resourceMenu => {
  //         const frameMenu = Object.assign({}, resourceMenu) as FrameMenu
  //         frameMenu.title = resourceMenu.description
  //         frameMenu.icon = resourceMenu.menuIcon
  //         frameMenu.children = loopMenu(resourceMenu.node)
  //         if (!this.activeMenuId) {
  //           this.activeMenuId = frameMenu.id
  //           activeMenu = frameMenu
  //         } else if (this.activeMenuId === frameMenu.id) {
  //           activeMenu = frameMenu
  //         }
  //         return frameMenu
  //       })
  //     }
  //     return []
  //   }
  //   const resourceMenuList = loopMenu(this.adminInfo.resourceMenuList)
  //   this.navigateToMenu(activeMenu)
  //   return resourceMenuList
  // }
  // @Watch('activeMenuId')
  // private watchActiveMenuId(val: any) {
  //   frameActiveMenuSession.set(val)
  // }
  // private created() {
  //   // 注册登出广播事件
  //   this.logoutBroadIndex = broadcastLogoutLocal.onBroadcast(() => {
  //     this.logoutBroadcast()
  //   })
  // }
  // private beforeDestroy() {
  //   broadcastLogoutLocal.offBroadcast(this.logoutBroadIndex)
  // }
  // private navigateToMenu(data: FrameMenu | null) {
  //   if (data && this.$route.name !== data.url) {
  //     this.$router.push({
  //       name: data.url
  //     })
  //   }
  // }
}
</script>

<style lang="scss">
.scrm-frame-header-logo img {
  width: 7.2rem;
}
</style>
